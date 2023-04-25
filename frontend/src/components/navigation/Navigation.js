import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRightToBracket, faRightFromBracket, faGamepad, faUser, faFolder } from "@fortawesome/free-solid-svg-icons";

import NavigationItem from "./NavigationItem";
import NavigationItemLink from "./NavigationItemLink";
import FolderList from "./FolderList";

import { encode } from "../../utils/URLUtils";

import classes from "./Navigation.module.scss";

/**
 * Creates the Navigation of the app.
 * @param props nav properties.
 * @constructor
 */
const Navigation = (props) => {
    const auth = props.auth;
    const loginData = {
        link: auth ? "/logout" : "/login",
        text: auth ? "Logout" : "Login",
        icon: auth ? faRightFromBracket : faRightToBracket
    };

    const folderListItems = (name, i) => {
        const url = encode(name);
        return (
            <NavigationItemLink to={`/folder/${url}`}
                                name={name}
                                icon={faFolder}
                                key={i}/>
        );
    };

    return (
        <header className={classes.wrapper}>
            <div className={classes.sidebar}>
                <ul>
                    <NavigationItemLink to="/" name="Home" icon={faHouse}/>
                    <NavigationItemLink to={loginData.link} name={loginData.text} icon={loginData.icon}/>

                    <FolderList folderListItems={folderListItems}/>

                    {auth && (
                        <NavigationItem name={props.email}>
                            <a className={classes.default}>
                                <FontAwesomeIcon icon={faUser}/>
                                <span>{props.email}</span>
                            </a>
                        </NavigationItem>
                    )}
                    {auth && (
                        <NavigationItemLink to="/test" name="Test" icon={faGamepad}/>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Navigation;
