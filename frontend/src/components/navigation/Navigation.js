import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRightToBracket, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

import classes from "./Navigation.module.scss";

/**
 * Creates the Navigation of the app.
 * @param props nav properties.
 * @constructor
 */
const Navigation = (props) => {
    const auth = props.auth;
    const loginStatus = auth ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>;
    const loginIcon = auth ? faRightFromBracket: faRightToBracket;
    return (
        <header className={classes.wrapper}>
            <div className={classes.sidebar}>
                <ul>
                    <li>
                        <FontAwesomeIcon icon={faHouse}/>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={loginIcon}/>
                        {loginStatus}
                    </li>
                    {auth && (
                        <li>
                            <FontAwesomeIcon icon={faUser}/>
                            <a>Logged in</a>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Navigation;
