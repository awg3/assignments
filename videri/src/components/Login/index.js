import React, { Component } from "react";
import { pixabayAPIKey } from "../../constants";
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

    componentWillMount() {
        // TODO: remove after wiring up login redirect
        localStorage.clear();
    }

    fetchMedia = (url, category) => {
        return fetch(url)
            .then(response => response.json())
            .then(val => {
                let images = JSON.parse(localStorage.getItem("images"));
                
                if (!images) {
                    images = {};
                }

                images[category] = val.hits.reduce((obj, item) => {
                    obj[item.id] = item;
                    return obj;
                }, {});

                localStorage.setItem("images", JSON.stringify({ ...images }));
            })
            .catch(error => Promise.reject(`${error.message}`));
    }

    getImages = (categories) => {
        const pixabayURL = `https://pixabay.com/api/?key=${pixabayAPIKey}`;

        for (let elem of categories) {
            this.fetchMedia(`${pixabayURL}&q=${elem}`, elem);
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            errors: {},
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { history } = this.props;
        const { email, password } = this.state;

        this.setState({ errors: {} });

        if (this.validateForm()) {
            // Mocking API call delay
            setTimeout(() => {
                const categories = ["elephant", "tennis", "champagne", "magic"];

                // Using this in place of redux for now.
                localStorage.setItem("user", JSON.stringify({ email, password }));

                this.getImages(categories);

                // Moving to Home on valid submit.
                history.push("/");
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
        const app = {
            name: "V I D E R I",
            title: "Orchestrator",
        };

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