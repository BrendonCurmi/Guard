import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Creates a route restricted to the passed "auth" property.
 * If access is authorised, the Route child component is rendered.
 * If access is not authorised, redirect to /login route.
 * @constructor
 */
const RestrictedRoute = (props) => {
    return props.auth ? <Outlet/> : <Navigate to={props.navigate}/>;
}

export default RestrictedRoute;
