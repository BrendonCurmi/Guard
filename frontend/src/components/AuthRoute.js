import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AuthRoute = ({}) => {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        auth?.user
            ? <Outlet/>
            : <Navigate to="/login" state={{ from: location }} replace/>
    );
};

export default AuthRoute;
