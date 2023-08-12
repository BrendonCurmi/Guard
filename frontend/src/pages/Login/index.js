import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

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

    const onChangeHandler = (event, property = event.target.id) => {
        setUserInput(prevState => {
            return { ...prevState, [property]: event.target.value };
        });
    };

    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const isRegistering = !isLoggingIn;

    const title = isLoggingIn ? "Sign in" : "Sign up";
    const buttonText = isLoggingIn ? "Login" : "Register";
    const switchButtonText = isLoggingIn ? "Create new account" : "Log into existing account";

    return (
        <>
            <h2 className={classes.title}>{title}</h2>
            <form className={classes.loginForm}>
                {isRegistering &&
                    <TextField id="email"
                               name="email"
                               value={userInput["email"]}
                               onChange={onChangeHandler}
                               label="Email"
                               className={classes.textField}
                               variant="filled"
                               type="text"/>}
                <TextField id="username"
                           name="username"
                           value={userInput["username"]}
                           onChange={onChangeHandler}
                           label="User"
                           className={classes.textField}
                           variant="filled"
                           type="text"/>
                <TextField id="pw"
                           name="pw"
                           value={userInput["pw"]}
                           onChange={onChangeHandler}
                           label="Password"
                           className={classes.textField}
                           variant="filled"
                           type="text"/>
                {isRegistering &&
                    <TextField id="pw-confirm"
                               name="pw-confirm"
                               value={userInput["pw-confirm"]}
                               onChange={onChangeHandler}
                               label="Confirm Password"
                               className={classes.textField}
                               variant="filled"
                               type="text"/>}
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
