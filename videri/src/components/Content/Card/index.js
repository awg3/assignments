import React, { Component } from "react";
import "./index.css";

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.showMedia = this.showMedia.bind(this);
    }

    showMedia = (event, data, cardName) => {
        event.preventDefault();

        this.props.showModal({ type: "media", url: data.webformatURL, cardName });
    }

    render() {
        const { data, dimensions, type, previewURL } = this.props;
        const cardName = previewURL && previewURL.substr(previewURL.lastIndexOf("/") + 1, previewURL.length);
        const cardType = previewURL && previewURL.split("/")[3];

        return (
            <div className="Card">
                <div className="square"></div>
                { /* TODO: share condition is unknown, see README.md for details */
                <img
                    alt="share"
                    className="shareIcon"
                    src={require("../../../assets/images/image@2x.png")}
                />
                }
                <div className="container">
                    <div className="card__image">
                        <img
                            alt={"card"}
                            onClick={e => this.showMedia(e, data, cardName)}
                            src={previewURL}
                        />
                    </div>
                    <div className="card__content" >
                        <div className="name">{ cardName }</div>
                        <div className="media">
                            { type &&
                                cardType === "photo" ?
                                    <img alt="media" src={require("../../../assets/images/image@2x.png")} />
                                : cardType === "video" ?
                                    <img alt="media" src={require("../../../assets/images/video@2x.png")} />
                                : cardType === "hi-res" &&
                                    <img alt="media" src={require("../../../assets/images/hi-res@2x.png")} />
                            }
                            <div className="time">12:34</div>
                        </div>
                        <div>
                            <div className="dimensions">{dimensions}</div>
                            <div className="created">Created</div>
                            <div className="date">2000/01/01 12:34</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
