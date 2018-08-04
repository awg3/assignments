// @flow
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";

export default () => (
    <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
    </Switch>
);
