import React, { useState, useEffect } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import SiteIcon from "../SiteIcon";
import NiceButton from "../buttons/NiceButton";

import classes from "./AccountView.module.scss";

const AccountView = ({ focus, createAccountRequest, onClick, getCreds }) => {
    const getOr = (property) => {
        return focus && focus[property] ? focus[property] : "";
    };

    const [userInput, setUserInput] = useState({
        site: getOr("site"),
        title: getOr("title"),
        email: getOr("email"),
        pw: getOr("pw")
    });
    const [showPw, setShowPw] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const onChangeHandler = (event) => {
        const property = event.target.id.split("-")[1];
        setUserInput({ ...userInput, [property]: event.target.value });
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
        }, 3000)

        return () => clearTimeout(delayDebounceFn)
    }, [userInput.site])

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const data = {
            title: userInput.title,
            site: userInput.site,
            email: userInput.email,
            pw: userInput.pw
        };

        createAccountRequest(data);
    };

    const showPwHandler = async () => {
        let pw = userInput.pw === "" && focus ? (await getCreds(focus._id)).pw : userInput.pw;
        setUserInput({ ...userInput, pw });
        setShowPw(!showPw);
    };

    const inputPwValue = focus && userInput.pw === "" ? "............." : userInput.pw;

    return (
        <div className={classes.accountViewWrapper}>
            <div className={classes.icon}>
                <SiteIcon domain={userInput.site} size="32"/>
            </div>
            <form className={`${classes.inputForm} ${!isEditing ? classes.readOnly : ""}`} onSubmit={onSubmitHandler}>
                <TextField
                    className={classes.textField}
                    required
                    id="input-title"
                    label="Title"
                    variant="outlined"
                    InputProps={{ readOnly: !isEditing }}
                    onChange={onChangeHandler}
                    value={userInput.title}
                />

                <TextField
                    className={classes.textField}
                    required
                    id="input-site"
                    label="Website Address"
                    variant="outlined"
                    InputProps={{ readOnly: !isEditing }}
                    onChange={onChangeHandler}
                    value={userInput.site}
                />

                <label>Login Details</label>
                <TextField
                    className={classes.textField}
                    id="input-email"
                    label="Email or username"
                    variant="outlined"
                    InputProps={{ readOnly: !isEditing }}
                    InputLabelProps={!isEditing && { shrink: false }}
                    onChange={onChangeHandler}
                    value={userInput.email}
                />

                <TextField
                    className={`${classes.textField} ${classes.pwTextField}`}
                    required
                    id="input-pw"
                    label="Password"
                    variant="outlined"
                    type={showPw ? "text" : "password"}
                    onChange={onChangeHandler}
                    value={inputPwValue}
                    InputProps={{
                        readOnly: !isEditing,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={showPwHandler}
                                    onMouseDown={showPwHandler}>
                                    {showPw ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                {isEditing ?
                    <NiceButton type="button"
                                color="primary"
                                onClick={() => setIsEditing(false)}>Save</NiceButton> :
                    <NiceButton type="button"
                                color="primary"
                                onClick={() => setIsEditing(true)}>Edit</NiceButton>}
                <NiceButton type="button"
                            onClick={onClick}
                            color="secondary"
                    // disabled
                >Cancel</NiceButton>
            </form>
        </div>
    );
};

export default AccountView;
