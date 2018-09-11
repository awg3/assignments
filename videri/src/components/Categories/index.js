import React, { Component } from "react";
import { firstLetterUpper } from "../../constants";
import "./index.css";

export default class Categories extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { categories, getItems, selectedCategory, showModal } = this.props;

        return (
            <div className="Categories">
                {
                    categories.map(category => {
                        return (
                            <div
                                key={`category-${category}`}
                                className="category"
                                onClick={() => getItems(category)}
                            >
                                <img
                                    alt="folder"
                                    className="category__image"
                                    src={require(
                                        `../../assets/images/folder_${
                                            category === selectedCategory
                                            ? "on"
                                            : "off"
                                        }.png`)
                                    }
                                />
                                <div className={`${category === selectedCategory ? "category__name selected" : "category__name"}`}
                                >
                                    { firstLetterUpper(category) }
                                </div>
                            </div>
                        )
                    })
                }
                <div
                    className="newCategory"
                    onClick={e => showModal({ type: "new folder", url: ""})}
                >
                    New Folder
                </div>
            </div>
        );
    }
}