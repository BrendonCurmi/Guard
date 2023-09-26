import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { safeFetch } from "../../utils/SafeFetch";
import { setEncryptionKey } from "../../security/EncryptionKeyUtils";
import { useAuth } from "../../context/AuthProvider";

import { LOGOUT_API } from "../../utils/API";

// Milliseconds to wait before redirecting
const redirectionWait = 3000;

/**
 * Logout page that logs out user and redirects them to /login page.
 */
const Logout = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const clear = () => {
        setAuth({});
        setEncryptionKey(null);
        navigate("/login");
    };

    useEffect(() => {
        safeFetch(LOGOUT_API, "POST")
            .then(() => setTimeout(clear, redirectionWait))
            .catch(err => {
                clear();
                console.log(err);
            });
    }, []);
    return <p>Logging out...</p>;
};

export default Logout;
