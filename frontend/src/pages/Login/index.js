import React, { useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CircularProgress, IconButton, InputAdornment, Tooltip } from "@mui/material";
import { Visibility, VisibilityOff, Refresh } from "@mui/icons-material";

import FormInput from "./FormInput";
import NiceButton from "../../components/buttons/NiceButton";
import PasswordEvaluation from "../../components/evaluator/PasswordEvaluation";
import { useAuth } from "../../context/AuthProvider";
import { safeFetch } from "../../utils/SafeFetch";
import { loadVault } from "../../storage/VaultCache";

import { setEncryptionKey } from "../../security/EncryptionKeyUtils";
import { generateHashes } from "../../security/SecurityUtils";
import { generate } from "../../utils/GeneratorUtils";

import { CREATE_API, LOGIN_API } from "../../utils/API";

import classes from "./index.module.scss";

const Login = () => {
    const { authenticated, setAuth } = useAuth();

    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    if (from === "/logout") from = "/";

    const [userInput, setUserInput] = useState({ username: "", pw: "" });
    const [isFailed, setIsFailed] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const userErr = errorMsg ? { error: true, helperText: errorMsg } : "";
    const pwInputRef = useRef(null);

    const [isSaving, setIsSaving] = useState(false);
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

    const formSubmissionHandler = async event => {
        event.preventDefault();
        setIsSaving(true);

        const username = userInput["username"];
        const pw = userInput["pw"];

        let valid = validateUsername(username) && validatePw(pw);

        // Short delay to allow circle progress symbol to appear, otherwise
        // hashing function will slow page and the symbol will barely appear
        await new Promise(resolve => setTimeout(resolve, 100));

        let data = {};
        if (isRegistering) {
            const pwConfirm = userInput["pw-confirm"];
            const email = userInput["email"];

            valid = valid && validatePwConfirm(pwConfirm) && validateEmail(email) && pw === pwConfirm;

            data = { email };
        }

        if (!valid) {
            setIsFailed(true);
            setIsSaving(false);
            return;
        }

        let { encryptionHash, authHash } = generateHashes(pw, username);

        const url = isRegistering ? CREATE_API : LOGIN_API;
        safeFetch(url, "POST", { username, authHash, ...data })
            .then(res => res.data)
            .then(async data => {
                setEncryptionKey(encryptionHash);
                await loadVault();

                setIsSaving(false);

                const accessToken = data.accessToken;
                setAuth({ username, accessToken });
            })
            .catch(error => {
                if (error.response.data.err) {
                    setErrorMsg(error.response.data.err);
                    setIsSaving(false);
                }
            });
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

    const [showPw, setShowPw] = useState(false);

    const showPwHandler = (event) => {
        event.preventDefault();
        setShowPw(prevState => !prevState);
    };

    const generatePassword = (event) => {
        event.preventDefault();
        const generatorParams = { length: 20, useCapitals: true, useDigits: true, useSymbols: true };

        const generated = generate(generatorParams);
        setUserInput(prevState => {
            return { ...prevState, pw: generated };
        });

        setShowPw(true);

        if (pwInputRef.current) {
            pwInputRef.current.value = generated;
            pwInputRef.current.focus();
        }
    };

    // If already logged in, send away or to home page
    // Navigate after loading all hooks to prevent error
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
                {isRegistering && <span className={classes.hint}>Make sure your master password is a long passphrase
                    that you will remember. It cannot be recovered or changed.</span>}
                <FormInput id="pw"
                           name="pw"
                           value={userInput.pw}
                           inputRef={pwInputRef}
                           onChange={onChangeHandler}
                           label="Password"
                           className={classes.textField}
                           showError={isFailed}
                           validation={validatePw}
                           type={showPw ? "text" : "password"}
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end">
                                       {isRegistering &&
                                           <Tooltip title="Generate Password" arrow placement="top" enterDelay={100}
                                                    leaveDelay={200}>
                                               <IconButton onClick={generatePassword}>
                                                   <Refresh/>
                                               </IconButton>
                                           </Tooltip>}
                                       <Tooltip title="Toggle Display Password" arrow placement="top" enterDelay={100}
                                                leaveDelay={200}>
                                           <IconButton onClick={showPwHandler}>
                                               {showPw ? <Visibility/> : <VisibilityOff/>}
                                           </IconButton>
                                       </Tooltip>
                                   </InputAdornment>
                               )
                           }}
                           errorMsg={"Enter a valid password longer than 8 characters"}/>
                {isRegistering && <PasswordEvaluation pw={userInput["pw"]}/>}
                {isRegistering &&
                    <FormInput id="pw-confirm"
                               name="pw-confirm"
                               value={userInput["pw-confirm"]}
                               onChange={onChangeHandler}
                               label="Confirm Password"
                               className={classes.textField}
                               showError={isFailed}
                               validation={validatePwConfirm}
                               type="password"
                               errorMsg={"Passwords do not match"}/>}
                <NiceButton type="submit"
                            color="primary">
                    {isSaving ? <CircularProgress size={24}/> : buttonText}
                </NiceButton>
                <a className={classes.left}
                   onClick={() => setIsLoggingIn(prevState => !prevState)}>{switchButtonText}</a>
            </form>
        </>
    );
};

export default Login;
