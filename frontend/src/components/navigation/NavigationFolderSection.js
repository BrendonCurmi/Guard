import React  from "react";
import { Link } from "react-router-dom";
import FolderList from "./FolderList";

import classes from "./Navigation.module.scss";

const NavigationFolderSection = () => {
    return (
        <>
            <span className={classes.folders}>
                <Link to="/folders">
                    <span>Folders</span>
                </Link>
            </span>
            <FolderList/>
        </>
    );
};

export default NavigationFolderSection;
