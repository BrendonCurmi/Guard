import React from "react";
import { faHouse, faRightToBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import NavigationItemLink from "./NavigationItemLink";
import NavigationFolderSection from "./NavigationFolderSection";

import { useAuth } from "../../context/AuthProvider";

import classes from "./Navigation.module.scss";

/**
 * Creates the Navigation of the app.
 * @constructor
 */
const Navigation = () => {
    const { auth } = useAuth();
    const isLoggedIn = auth?.user;
    const show = isLoggedIn;

    const loginData = {
        link: isLoggedIn ? "/logout" : "/login",
        text: isLoggedIn ? "Logout" : "Login",
        icon: isLoggedIn ? faRightFromBracket : faRightToBracket
    };

    return (
        <header className={classes.wrapper}>
            <div className={classes.sidebar}>
                <ul>
                    <NavigationItemLink to="/" name="Home" icon={faHouse}/>
                    <NavigationItemLink to={loginData.link} name={loginData.text} icon={loginData.icon}/>

                    {show && <NavigationFolderSection/>}
                </ul>
            </div>
        </header>
    );
};

export default Navigation;
