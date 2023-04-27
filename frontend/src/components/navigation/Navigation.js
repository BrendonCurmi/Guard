import React from "react";
import {
    faHouse,
    faRightToBracket,
    faRightFromBracket,
    faKey,
    faLock,
    faStickyNote, faTrash, faArrowRotateForward
} from "@fortawesome/free-solid-svg-icons";

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
    const isLoggedIn = auth?.accessToken;
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

                    <NavigationItemLink to="/pass" name="Passwords" icon={faKey} show/>
                    <NavigationItemLink to="/pins" name="Pins" icon={faLock} show/>
                    <NavigationItemLink to="/notes" name="Secure Notes" icon={faStickyNote} show/>
                    <NavigationItemLink to="/trash" name="Trash" icon={faTrash} show/>
                    <NavigationItemLink to="/gen" name="Password Generator" icon={faArrowRotateForward} show/>

                    {show && <NavigationFolderSection/>}
                </ul>
            </div>
        </header>
    );
};

export default Navigation;
