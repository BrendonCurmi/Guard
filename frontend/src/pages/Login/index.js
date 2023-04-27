import React, { useState } from "react";
import { TextField } from "@mui/material";

import NiceButton from "../../components/buttons/NiceButton";
import { useAuth } from "../../context/AuthProvider";

import classes from "./index.module.scss";

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const [userInput, setUserInput] = useState({ username: "", pw: "" });

    const onChangeHandler = (event, property = event.target.id) => {
        setUserInput(prevState => {
            return { ...prevState, [property]: event.target.value };
        });
    };

    return (
        <>
            <h2 className={classes.title}>Sign in</h2>
            <form className={classes.loginForm}>
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
                <div className={classes.left}>
                    <input id="persist"
                           checked={persist}
                           onChange={() => setPersist(prev => !prev)}
                           className={classes.checkbox}
                           type="checkbox"/>
                    <label htmlFor="persist">Stay logged in</label>
                </div>
                <NiceButton type="submit"
                            color="primary">Login</NiceButton>
                <a className={classes.left}>Create new account</a>
            </form>
        </>
    );
};

export default Login;
