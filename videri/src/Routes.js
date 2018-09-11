import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

export default () => {
    const isUserLoggedIn = JSON.parse(localStorage.getItem("user"));
    // TODO: create a private route to handle login redirect.
    return (
        <Switch>
            { isUserLoggedIn
                ? <Route path="/" exact component={Home} />
                : <Route path="/login" exact component={Login} />
            }
        </Switch>
    )
};
