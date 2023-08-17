import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { safeFetch } from "../../utils/SafeFetch";
import { setEncryptionKey } from "../../../security/EncryptionKeyUtils";
import { useAuth } from "../../context/AuthProvider";

import { LOGOUT_API } from "../../utils/API";

// Milliseconds to wait before redirecting
const redirectionWait = 3000;

/**
 * Logout page that logs out user and redirects them to /login page.
 * @constructor
 */
const Logout = () => {
    const navigate = useNavigate();
    const { setAuth, setPersist } = useAuth();

    const clear = () => {
        setAuth({});
        setPersist(false);
        setEncryptionKey(null);
        navigate("/login");
    };

    useEffect(() => {
        safeFetch(LOGOUT_API, "POST")
            .then(() => setTimeout(clear, redirectionWait))
            .catch(console.log);
    }, []);
    return <p>Logging out...</p>;
};

export default Logout;
