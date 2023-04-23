import React from "react";
import { Link } from "react-router-dom";

/**
 * Creates the Navigation of the app.
 * @param props nav properties.
 * @constructor
 */
const Navigation = (props) => {
    const auth = props.auth;
    const loginStatus = auth ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>;
    return (
        <header>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        {loginStatus}
                    </li>
                    {auth && (
                        <li>
                            <a>Logged in</a>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Navigation;
