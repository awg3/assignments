// @flow
import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Categories } from "../Categories";
import { ContentTable } from "../ContentTable";
import "./index.css";

const appName = "V I D E R I";

const Home = () => {
    const images = JSON.parse(localStorage.getItem("images"));
    const categories = images && Object.keys(images);

    return (
        <div className="Home">
            <Navbar fluid collapseOnSelect className="home-navbar">
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/home" className="appName">{ appName }</Link>
                        <span className="subtitle">content</span>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
            </Navbar>
            <Categories items={categories}/>
            <ContentTable items={images}/>
        </div>
    );
};

export default Home;
