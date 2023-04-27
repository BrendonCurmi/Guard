import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AuthRoute = ({ loginStatus = true }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const access = !auth?.accessToken === !loginStatus;//todo test this
    return (
        access
            ? <Outlet/>
            : <Navigate to="/login" state={{ from: location }} replace/>
    );
};

export default AuthRoute;
