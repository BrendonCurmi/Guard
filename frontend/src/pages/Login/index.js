import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import FormInput from "./FormInput";
import NiceButton from "../../components/buttons/NiceButton";
import { useAuth } from "../../context/AuthProvider";
import { safeFetch } from "../../utils/SafeFetch";

import { setEncryptionKey } from "../../../security/EncryptionKeyUtils";
import { generateHashes } from "../../../security/SecurityUtils";

import { CREATE_API, LOGIN_API, REFRESH_API } from "../../utils/API";

import classes from "./index.module.scss";

const Login = () => {
    const { authenticated, setAuth, persist, setPersist } = useAuth();

    // If persist is enabled, try to auto sign in using refresh token
    useEffect(() => {
        if (persist) {
            safeFetch(REFRESH_API)
                .then(res => res.status === 200 ? res.json() : null)
                .then(data => {
                    if (data === null || !data.accessToken) return;
                    const accessToken = data.accessToken;
                    setAuth({ accessToken });
                    navigate(from, { replace: true });
                })
                .catch(console.log);
        }
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [userInput, setUserInput] = useState({ username: "", pw: "" });
    const [isFailed, setIsFailed] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const userErr = errorMsg ? { error: true, helperText: errorMsg } : "";

    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const isRegistering = !isLoggingIn;

    const title = isLoggingIn ? "Sign in" : "Sign up";
    const buttonText = isLoggingIn ? "Login" : "Register";
    const switchButtonText = isLoggingIn ? "Create new account" : "Log into existing account";

    const onChangeHandler = (event, property = event.target.id) => {
        setUserInput(prevState => {
            return { ...prevState, [property]: event.target.value };
        });
    };

    const formSubmissionHandler = event => {
        event.preventDefault();
        const username = userInput["username"];
        const pw = userInput["pw"];

        let valid = validateUsername(username) && validatePw(pw);

        const { encryptionHash, authHash } = generateHashes(pw, username);

        const url = isRegistering ? CREATE_API : LOGIN_API;
        let data = { username, authHash };

        if (isRegistering) {
            const pwConfirm = userInput["pw-confirm"];
            const email = userInput["email"];

            valid = valid && validatePwConfirm(pwConfirm) && validateEmail(email) && pw === pwConfirm;

            data = { email, ...data };
        }

        if (!valid) {
            setIsFailed(true);
            return;
        }

        safeFetch(url, "POST", data)
            .then(res => res.json())
            .then(data => {
                if (data.err) {
                    setErrorMsg(data.err);
                    return;
                }

                console.log(data);
                const accessToken = data.accessToken;
                setAuth({ username, accessToken });
                // setEncryptionKey(encryptionHash);
                // navigate(from, { replace: true });
            })
            .catch(console.log);
    };

    // Adapted from https://stackoverflow.com/a/46181
    const validateEmail = (value) => {
        return value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    const validateUsername = (value) => {
        return value.length >= 6
            && value.length <= 30
            && isAlphanumeric(value);
    }

    const validatePw = (value) => {
        return value.length > 8;
    }

    const validatePwConfirm = (value) => {
        return value === userInput.pw;
    }

    // Adapted from https://javascript.plainenglish.io/check-if-string-is-alphanumeric-in-javascript-e325caa3ee
    const isAlphanumeric = (str) => {
        return str.match(/^[a-zA-Z0-9]+$/) !== null;
    };

    // If already logged in, send away or to home page
    if (authenticated) {
        const to = from === "/login" ? "/" : from;
        return (<Navigate to={to} replace/>);
    }

    return (
        <>
            <h2 className={classes.title}>{title}</h2>
            <form className={classes.loginForm} onSubmit={formSubmissionHandler}>
                {isRegistering &&
                    <FormInput id="email"
                               name="email"
                               value={userInput["email"]}
                               onChange={onChangeHandler}
                               label="Email"
                               className={classes.textField}
                               showError={isFailed}
                               validation={validateEmail}
                               errorMsg={"Enter a valid email address"}/>}
                <FormInput id="username"
                           name="username"
                           value={userInput["username"]}
                           onChange={onChangeHandler}
                           label="Username"
                           className={classes.textField}
                           showError={isFailed}
                           validation={validateUsername}
                           errorMsg={"Enter a unique username of length 6-30 without special characters"}
                           {...userErr}/>
                <FormInput id="pw"
                           name="pw"
                           value={userInput["pw"]}
                           onChange={onChangeHandler}
                           label="Password"
                           className={classes.textField}
                           showError={isFailed}
                           validation={validatePw}
                           errorMsg={"Enter a valid password longer than 8 characters"}/>
                {isRegistering &&
                    <FormInput id="pw-confirm"
                               name="pw-confirm"
                               value={userInput["pw-confirm"]}
                               onChange={onChangeHandler}
                               label="Confirm Password"
                               className={classes.textField}
                               showError={isFailed}
                               validation={validatePwConfirm}
                               errorMsg={"Passwords do not match"}/>}
                <div className={classes.left}>
                    <input id="persist"
                           checked={persist}
                           onChange={() => setPersist(prev => !prev)}
                           className={classes.checkbox}
                           type="checkbox"/>
                    <label htmlFor="persist">Stay logged in</label>
                </div>
                <NiceButton type="submit"
                            color="primary">{buttonText}</NiceButton>
                <a className={classes.left}
                   onClick={() => setIsLoggingIn(prevState => !prevState)}>{switchButtonText}</a>
            </form>
        </>
    );
};

export default Login;
