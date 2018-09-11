import React, { Component } from "react";
import { app } from "../../constants";
import "./index.css";

export default class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = JSON.parse(localStorage.getItem("user"));

        return (
            <div className="NavBar">
                <div className="menuIcon">
                    <div className="row">
                        <div className="square"/>
                        <div className="square"/>
                        <div className="square"/>
                    </div>
                    <div className="row">
                        <div className="square"/>
                        <div className="square"/>
                        <div className="square"/>
                    </div>
                    <div className="row">
                        <div className="square"/>
                        <div className="square"/>
                        <div className="square"/>
                    </div>
                </div>
                <div className="content">
                    <div className="title">
                        <span className="app__name">{ app.name }</span>
                        <span className="app__title">content</span>
                    </div>
                    {
                        /* TODO: repository can probably be determined by an API call */
                    }
                    <div className="repository">
                        <div className="repository__name">Organization</div>
                        <div className="repository__title">repository</div>
                    </div>
                    <div className="user">
                        <span className="user__name">{ user.email }</span>
                        <img
                            alt="profile"
                            className="user__image"
                            src={require("../../assets/images/profile.jpg")}
                        />
                    </div>
                </div>
            </div>
        );
    }
}