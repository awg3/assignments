import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

export default () => (
    <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
    </Switch>
);
