import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import FormInput from "./FormInput";
import NiceButton from "../../components/buttons/NiceButton";
import { useAuth } from "../../context/AuthProvider";
import { safeFetch } from "../../utils/SafeFetch";

import classes from "./index.module.scss";

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const API = "http://localhost:4000/api/auth";
    const REFRESH_API = API + "/refreshToken";

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

    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const isRegistering = !isLoggingIn;

    const title = isLoggingIn ? "Sign in" : "Sign up";
    const buttonText = isLoggingIn ? "Login" : "Register";
    const switchButtonText = isLoggingIn ? "Create new account" : "Log into existing account";

    const onChangeHandler = (event, property) => {
        setUserInput(prevState => {
            return { ...prevState, [property]: event.target.value };
        });
    };

    // Adapted from https://stackoverflow.com/a/46181
    const validateEmail = (value) => {
        return value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    const emailValidation = (value, setErrorMsg) => {
        setErrorMsg(!validateEmail(value) ? "Not a valid email" : "");
    }

    const validateUsername = (value) => {
        return value.length > 5;
    }

    const usernameValidation = (value, setErrorMsg) => {
        setErrorMsg(!validateUsername(value) ? "Username is too short" : "");
    }

    const validatePw = (value) => {
        return value.length > 5;
    }

    const pwValidation = (value, setErrorMsg) => {
        setErrorMsg(!validatePw(value) ? "Password is too short" : "");
    }

    const validatePwConfirm = (value) => {
        return value === userInput.pw;
    }

    const pwConfirmValidation = (value, setErrorMsg) => {
        setErrorMsg(!validatePwConfirm(value) ? "Passwords do not match" : "");
    }


    return (
        <>
            <h2 className={classes.title}>{title}</h2>
            <form className={classes.loginForm}>
                {isRegistering &&
                    <FormInput id="email"
                               name="email"
                               value={userInput["email"]}
                               onChange={onChangeHandler}
                               label="Email"
                               className={classes.textField}
                               onChangeValidation={emailValidation}/>}
                <FormInput id="username"
                           name="username"
                           value={userInput["username"]}
                           onChange={onChangeHandler}
                           label="User"
                           className={classes.textField}
                           onChangeValidation={usernameValidation}/>
                <FormInput id="pw"
                           name="pw"
                           value={userInput["pw"]}
                           onChange={onChangeHandler}
                           label="Password"
                           className={classes.textField}
                           onChangeValidation={pwValidation}/>
                {isRegistering &&
                    <FormInput id="pw-confirm"
                               name="pw-confirm"
                               value={userInput["pw-confirm"]}
                               onChange={onChangeHandler}
                               label="Confirm Password"
                               className={classes.textField}
                               onChangeValidation={pwConfirmValidation}/>}
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
