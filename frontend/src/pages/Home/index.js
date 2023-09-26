import React from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
    return <Navigate to="/passwords" replace/>;
};

export default Home;
