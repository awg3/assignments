import React, { Component } from "react";
import "./index.css";

export default class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            folderName: "",
        };
    }

    handleChange = (event) =>
        this.setState({
            folderName: event.target.value,
        });

    handleSubmit = (event) => {
        const { addNewCategory, categories } = this.props;
        event.preventDefault();

        if (categories.length < 10 &&
            categories.indexOf(this.state.folderName) == -1
        ) {
 
            addNewCategory(this.state.folderName);
        }
    }
    
    renderInput = () => {
        const { folderName } = this.state;

        return (
            <div className="newFolder">
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="newFolder"
                        onChange={this.handleChange}
                        placeholder="New folder name"
                        type="text"
                        value={folderName}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    };
    
    renderMedia = (modalParams) => (
        // TODO: This could be expanded to generate video/image accordingly.
        <div className="media">
            <div className="name">{ modalParams.cardName }</div>
            <img alt="media" className="image" src={modalParams.url} />
        </div>
    );

    render() {
        const { closeModal, modalParams } = this.props;
        const type = modalParams.type === "new folder" ? true : false;

        return (
            <div className="Modal">
                <div className="blur"></div>
                <div className={type ? "content" : "content media"}>
                    <img
                        alt="close"
                        className="close"
                        onClick={e => closeModal()}
                        src={require("../../assets/images/close@2x.png")}
                    />
                    { type
                        ? this.renderInput()
                        : this.renderMedia(modalParams)
                    }
                </div>
            </div>
        );
    }
}
