import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

// Milliseconds to wait before redirecting
const redirectionWait = 3000;

/**
 * Logout page that logs out user and redirects
 * them to /login page.
 * @constructor
 */
const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        //todo logout

        setTimeout(() => navigate("/login"), redirectionWait)
    }, [])
    return <p>Logging out...</p>;
};

export default Logout;
