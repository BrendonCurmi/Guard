import React from "react";
import { Link } from "react-router-dom";

import classes from "./index.module.scss";

const NotFound = () => {
    return (
        <div className={classes.notFound}>
            <h1>404 Page Not Found</h1>
            <Link to="/passwords">Go to Passwords</Link>
        </div>
    );
};

export default NotFound;
