import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
// reactstrap components
import { } from "reactstrap";
import AuthService from "services/AuthService.js"

function PrivateRoute({ component: Component, ...rest }) {
    
    return (
        <Route {...rest} render={(props) => (
            localStorage.getItem('isAuth') === "true"
                ? <Component {...props}></Component>
                : <Redirect to={{
                    pathname: '/cms/login',
                    state: { from: props.location }
                }} />
        )} />

    )
}

export default PrivateRoute;