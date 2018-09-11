import React, { Component } from "react";
import Card from "./Card";
import "./index.css";

export default class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
        }

        this.filterList = this.filterList.bind(this);
    }

    componentWillMount() {
        const { cards } = this.props;

        this.setState({
            items: cards,
        });
    }

    componentWillReceiveProps(newProps) {
        const { cards } = this.props;

        if (JSON.stringify(newProps.cards) !== JSON.stringify(cards)) {
            this.setState({
                ...this.state,
                items: newProps.cards,
            });
        }
    }

    filterList = (event) => {
        const { cards } = this.props;
        const { items } = this.state;
        const term = event.target.value.toLowerCase();

        if (term && term.length > 0) {
            const filtered = {};

            for (let key in items) {
                // Filters based on search term
                if (items.hasOwnProperty(key) && items[key].tags.includes(term)) {
                    filtered[key] = items[key];
                }
            }

            this.setState({
                items: filtered,
            });
        } else {
            this.setState({
                items: cards,
            })
        }
    }

    render() {
        const { showModal } = this.props;
        const { items } = this.state;

        const dragAndDrop = {
            title: "DRAG and DROP files",
            info: "Recommended file types: Images (.png), videos (.mp4) and apps (.apk) up to 3GB in file size",
        }

        return (
            <div className="Content">
                <div className="header">
                    <div className="title">content</div>
                    <div className="rightSide">
                        <div className="dragDrop">
                            { /* TODO: see readme for why the upload and drag/drop images are set unlike the provided design. */ }
                            <img
                                alt="upload"
                                src={require("../../assets/images/image@2x.png")}
                            />
                            <div className="text">
                                <p className="text__top">
                                    { dragAndDrop.title }
                                </p>
                                <p className="text__bottom">
                                    { dragAndDrop.info }
                                </p>
                            </div>
                        </div>
                        <div>
                            <img
                                alt="search"
                                src={require("../../assets/images/image@2x.png")}
                            />
                        </div>
                        <div className="search">
                            <input type="text" onChange={this.filterList} />
                        </div>
                    </div>
                </div>
                { items && Object.keys(items).length > 0
                    ? (
                    <div className="table">
                        { Object.values(items).map(item =>
                            <Card
                                key={item.id}
                                item={item}
                                dimensions={`${item.imageHeight} x ${item.imageWidth}`}
                                data={item}
                                pageURL={item.pageURL}
                                previewURL={item.previewURL}
                                showModal={showModal}
                                type={item.type}
                            />
                        )}
                    </div>
                    )
                    : <div className="noContent">No content to display</div>
                }
            </div>
        );
    }
}