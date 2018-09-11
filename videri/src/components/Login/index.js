import React, { Component } from "react";
import { app } from "../../constants";
import "./index.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            errors: {},
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        this.setState({ errors: {} });

        if (this.validateForm()) {
            // Mocking API call delay
            setTimeout(() => {
                // Using this in place of redux for now.
                localStorage.setItem("user", JSON.stringify({ email, password }));

                // Moving to Home on valid submit.
                this.props.history.push("/home");
            }, 1000);
        }
    }

    validateForm() {
        const { email, password } = this.state;
        const errors = {};
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{11,}$/;
        const validEmail = regexEmail.test(String(email).toLowerCase());
        const validPassword = regexPassword.test(String(password));

        // must be a valid email.
        if (!validEmail) {
            errors.email = "Invalid email";
        }
        // 10 chars long, contain upper/lower case letters and at least one number.
        if (!validPassword) {
            errors.password = "Invalid password";
        }

        // set validation errors if any exist
        if (!validEmail || !validPassword) {
            this.setState({ errors });
        }

        return validEmail && validPassword;
    }

    render() {
        const { email, errors, password } = this.state;
        const formError = Object.keys(errors).length > 0;

        return (
            <div className="Login">
                <div className="box">
                    <div className="title">
                        <span className="app__name">{ app.name }</span>
                        <span className="app__title">{ app.title }</span>
                    </div>
                    <div className="subTitle">
                        Sign In
                    </div>
                    <div className="form">
                        <form onSubmit={this.handleSubmit}>
                            { errors.email &&
                                <div className="errorMessage">{ errors.email }</div>
                            }
                            <input
                                className={errors.email && "error"}
                                name="email"
                                onChange={this.handleChange}
                                placeholder="ID"
                                type="text"
                                value={email}
                            />
                            { errors.password &&
                                <div className="errorMessage">{ errors.password }</div>
                            }
                            <input
                                className={errors.password && "error"}
                                name="password"
                                onChange={this.handleChange}
                                placeholder="PASSWORD"
                                type="password"
                                value={password}
                            />
                            <button
                                className={
                                    formError
                                    ? "submit error"
                                    : "submit"
                                }
                                disabled={formError}
                                onClick={e => this.handleSubmit}
                                type="submit"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}