import React, { useState, useEffect } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import SiteIcon from "../SiteIcon";
import NiceButton from "../buttons/NiceButton";
import FolderSelect from "./FolderSelect";

import { useFolder } from "../../store/FolderProvider";

import classes from "./AccountView.module.scss";

const AccountView = ({ focus, submitAccountRequest, onClick, getCreds }) => {
    const getOr = (property, defaultVal = "", fix = false) => {
        return focus && focus[property] ?
            fix ? fix(focus[property]) : focus[property]
            : defaultVal;
    };

    const allFolders = useFolder();

    const foldersIdsToNames = (ids) => {
        return ids.map(id => allFolders[id]);
    };

    const [userInput, setUserInput] = useState({
        site: getOr("site"),
        title: getOr("title"),
        email: getOr("email"),
        pw: getOr("pw"),
        folders: getOr("folders", [], foldersIdsToNames)
    });
    const [showPw, setShowPw] = useState(false);
    const [isEditing, setIsEditing] = useState(focus === null);

    const onChangeHandler = (event, property = event.target.id.split("-")[1]) => {
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
        
        // Remove pw property from data before sending
        // if pw hasn't been changed
        if (data.pw === "") delete data.pw;

        // Update with folders if selected
        if (userInput.folders !== []) {
            // Convert selected folder Ids to folder names
            data.folders = userInput.folders.map(name =>
                Object.keys(allFolders).find(key => allFolders[key] === name)
            );
        }

        submitAccountRequest(data);
    };

    const inputPwValue = focus && userInput.pw === "" && !isEditing ? "............." : userInput.pw;

    const initPw = async () => {
        let pw = focus && userInput.pw === "" ? (await getCreds(focus._id)).pw : userInput.pw;
        setUserInput({ ...userInput, pw });
    };

    const showPwHandler = async () => {
        await initPw();// <- would cause issues because of inputPwValue defaulting when fields is empty
        setShowPw(!showPw);
    };

    const onEditBtnClick = async (event) => {
        event.preventDefault();
        await initPw();// <- loading pw on edit instead fixes it
        setIsEditing(true);
    };

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
                    InputLabelProps={!isEditing ? { shrink: false } : {}}
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

                <FolderSelect className={classes.folderSelect}
                              onChange={event => onChangeHandler(event, "folders")}
                              label="Folders"
                              readOnly={!isEditing}
                    // InputProps={{ readOnly: !isEditing }}
                    // InputLabelProps={!isEditing ? { shrink: false } : {}}
                              value={userInput.folders}
                              allFolders={allFolders}/>

                {isEditing ?
                    <NiceButton type="submit"
                                color="primary">Save</NiceButton> :
                    <NiceButton type="button"
                                color="primary"
                                onClick={onEditBtnClick}>Edit</NiceButton>}
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
