import React, { Component } from "react";
import Categories from "../Categories";
import Content from "../Content";
import Modal from "../Modal";
import NavBar from "../NavBar";
import { app } from "../../constants";
import "./index.css";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: {
                byID: {},
                categories: [],
            },
            selectedCategory: "",
            modal: {
                show: false,
                modalParams: {
                    cardName: "",
                    type: "",
                    url: "",
                },
            },
            total: 50, // Default for demo purposes.
        };
    }

    componentWillMount() {
        const { items } = this.state;
        const categories = ["thunder", "water"];

        // initializing the state
        this.setState({
            items: {
                ...items,
                categories, // Default terms for demo purposes.
            },
            selectedCategory: categories[0],
        });

        this.getItems(categories[0]);
    }

    fetchMedia = (url, category) => {
        return fetch(url)
            .then(response => response.json())
            .then(val => {
                const { items } = this.state;
                const { byID, categories } = items;

                if (categories.indexOf(category) >= 0) {
                    byID[category] = val.hits.reduce((obj, item) => {
                        obj[item.id] = item;
                        return obj;
                    }, {});

                    this.setState({
                        items: {
                            ...items,
                            byID: byID,
                        },
                        selectedCategory: category,
                    });
                }
            })
            .catch(error => Promise.reject(`${error.message}`));
    }

    addNewCategory = (category) => {
        const { items } = this.state;
        const newCategories = items.categories;
        
        newCategories.push(category);

        this.setState({
            items: {
                ...items,
                categories: newCategories,
            }
        });

        this.getItems(category);
        this.closeModal();
    }

    getItems = (category) => {
        const { total } = this.state;

        return this.fetchMedia(`https://pixabay.com/api/?key=${app.pixabayAPIKey}&q=${category}&per_page=${total}`, category);
    }

    showModal = (modalParams) => {
        this.setState({
            modal: {
                show: true,
                modalParams: {
                    ...modalParams,
                }
            }
        });
    }

    closeModal = () =>
        this.setState({
            modal: {
                show: false,
                modalParams: {
                    cardName: "",
                    type: "",
                    url: "",
                },
            }
        });

    render() {
        const { items, selectedCategory, modal } = this.state;
        const { byID, categories } = items;

        return (
            <div className="Home">
                <NavBar />
                { categories &&
                    <Categories
                        categories={categories}
                        getItems={this.getItems}
                        selectedCategory={selectedCategory}
                        showModal={this.showModal}
                    />
                }
                { Object.keys(byID).length > 0 &&
                    <Content cards={byID[selectedCategory]} showModal={this.showModal} />
                }
                { modal.show &&
                    <Modal
                        addNewCategory={this.addNewCategory}
                        categories={categories}
                        closeModal={this.closeModal}
                        modalParams={modal.modalParams}
                    />
                }
            </div>
        );
    };
};