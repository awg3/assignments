// @flow
import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { getImages } from "./actions";
import "./index.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isLoading: false,
        };
    }

    validateInputs() {
        const { email, password } = this.state;

        if (email.length === 0 || password.length === 0) {
            return null;
        } else if(this.validateForm) {
            return "success";
        } else {
            return "error";
        }
    }

    validateForm() {
        const { email, password } = this.state;
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{11,}$/;

        // must be a valid email and password must be 10 chars long,
        // contain upper/lower case letters and at least one number.
        return regexEmail.test(String(email).toLowerCase()) &&
               regexPassword.test(String(password));
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;

        this.setState({
            isLoading: true,
        });

        setTimeout(() => {
            const categories = ["elephant", "conch", "champagne", "puzzle"];

            // Mocking API call delay
            this.setState({
                isLoading: false,
            });

            // Using this in place of redux for now.
            localStorage.setItem("user", JSON.stringify({ email, password }));

            getImages(categories);

            this.props.history.push("/home");
        }, 1000);
    }

    render() {
        const { email, password, isLoading } = this.state;
        const appName = "V I D E R I";

        return (
            <div className="Login">
                <div className="box">
                    <div className="title">
                        <span className="appName">{appName}</span>
                        <span className="subTitle">Orchestrator</span>
                    </div>
                    <div className="formName">
                        Sign In
                    </div>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup
                                controlId="email"
                                bsSize="large"
                                validationState={this.validateInputs()}
                            >
                                <FormControl
                                    autoFocus
                                    value={email}
                                    onChange={this.handleChange}
                                    placeholder="ID"
                                />
                            </FormGroup>
                            <FormGroup
                                controlId="password"
                                bsSize="large"
                            >
                                <FormControl
                                    value={password}
                                    onChange={this.handleChange}
                                    placeholder="PASSWORD"
                                    type="password"
                                />
                            </FormGroup>
                            <Button
                                block
                                bsSize="large"
                                className="submit"
                                disabled={!this.validateForm()}
                                onClick={!isLoading ? this.handleSubmit : null}
                                type="submit"
                            >
                                Sign in
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};
