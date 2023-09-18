import React from "react";
import {
    faHouse,
    faRightToBracket,
    faRightFromBracket,
    faKey,
    faLock,
    faStickyNote,
    faTrash,
    faArrowRotateForward,
    faHeartbeat
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
    const { authenticated } = useAuth();
    const show = authenticated;

    const loginData = {
        link: authenticated ? "/logout" : "/login",
        text: authenticated ? "Logout" : "Login",
        icon: authenticated ? faRightFromBracket : faRightToBracket
    };

    return (
        <header className={classes.wrapper}>
            <div className={classes.sidebar}>
                <ul>
                    <NavigationItemLink to="/" name="Home" icon={faHouse}/>
                    <NavigationItemLink to={loginData.link} name={loginData.text} icon={loginData.icon}/>

                    <NavigationItemLink to="/passwords" name="Passwords" icon={faKey} show/>
                    <NavigationItemLink to="/pins" name="Pins" icon={faLock} show/>
                    <NavigationItemLink to="/notes" name="Secure Notes" icon={faStickyNote} show/>
                    <NavigationItemLink to="/trash" name="Trash" icon={faTrash} show/>
                    <NavigationItemLink to="/generator" name="Password Generator" icon={faArrowRotateForward} show/>
                    <NavigationItemLink to="/monitor" name="Health Monitor" icon={faHeartbeat} show/>

                    {show && <NavigationFolderSection/>}
                </ul>
            </div>
        </header>
    );
};

export default Navigation;
