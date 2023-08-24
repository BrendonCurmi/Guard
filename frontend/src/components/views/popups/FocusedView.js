import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Modal from "../../modals/Modal";
import NiceButton from "../../buttons/NiceButton";
import FolderSelect from "./FolderSelect";
import { encryptData } from "../../../../security/SecurityUtils";

import { useFolders } from "../../../store/FolderProvider";

import classes from "./FocusedView.module.scss";

/**
 * @param focus the item to focus the view on.
 * @param submitItemRequest the function to execute when submitting (creating & updating).
 * @param onClick the function to execute when clicking Cancel button to close the view.
 * @param fields the array of form fields.
 * @param dataType the item type.
 * @returns {JSX.Element}
 * @constructor
 */
const FocusedView = ({ focus, submitItemRequest, onClick, fields, dataType, show }) => {
    if (!show) return null;

    /**
     * Get the specified value from the focus item. If it doesn't exist,
     * return the specified default value. If it exists, fix it using
     * the specified fix function if one is provided.
     * @param property the name of the property.
     * @param defaultVal the default value.
     * @param fix the function to execute to fix the value if it exists.
     * @returns {*|string}
     */
    const getOr = (property, defaultVal = "", fix = false) => {
        return focus && focus[property] ?
            fix ? fix(focus[property]) : focus[property]
            : defaultVal;
    };

    const allFolders = useFolders().folders;

    /**
     * Convert an array of folder ids to an array of folder names.
     * @param ids the array of folder ids.
     * @returns {*} an array of folder names.
     */
    const foldersIdsToNames = (ids) => {
        return ids.map(id => allFolders[id]);
    };

    // Set up initial user input values
    let secureField = "";
    const initialUserInput = {
        folders: getOr("folders", [], foldersIdsToNames)
    };
    fields.map(field => {
        if (field instanceof Object && field.value) {
            initialUserInput[field.value] = getOr(field.value);
            if (field.secure) {
                secureField = field.value;
            }
        }
    });
    const [userInput, setUserInput] = useState(initialUserInput);

    const [showPw, setShowPw] = useState(false);
    const [isEditing, setIsEditing] = useState(focus === null);

    /**
     * Update user input property when changing field input values.
     * @param event the event.
     * @param property the property to update.
     */
    const onChangeHandler = (event, property = event.target.id.split("-")[1]) => {
        setUserInput(prevState => {
            return { ...prevState, [property]: event.target.value };
        });
    };
    //todo check the target id property stuff

    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //     }, 3000)
    //
    //     return () => clearTimeout(delayDebounceFn)
    // }, [userInput.site])

    /**
     * Organise input data and submit.
     * @param event the event.
     */
    const onSubmitHandler = (event) => {
        event.preventDefault();

        const data = userInput;

        // Remove secure property from data before sending
        // if it hasn't been set
        if (data[secureField] === "") delete data[secureField];

        // Update with folders if selected
        if (userInput.folders !== []) {
            // Convert selected folder ids to folder names
            data.folders = userInput.folders.map(name =>
                Object.keys(allFolders).find(key => allFolders[key] === name)
            );
        }

        // Encrypt data before sending to server
        const encryptedData = {};
        for (let key in data) {
            let value = data[key];
            if (typeof value === "string") {
                value = encryptData(data[key]);
            }
            encryptedData[key] = value;
        }

        submitItemRequest(encryptedData);
    };

    const secureUserInputValue = userInput[secureField];

    /**
     * Load the secure value.
     */
    const loadSecureUserInputValue = async () => {
        let secureVal = userInput[secureField];
        setUserInput(prevState => {
            return { ...prevState, [secureField]: secureVal };
        });
    };

    const showSecureHandler = async () => {
        await loadSecureUserInputValue();// <- would cause issues because of secureUserInputValue defaulting when field is empty
        setShowPw(!showPw);
    };

    const onEditBtnClick = async (event) => {
        event.preventDefault();
        await loadSecureUserInputValue();// <- loading pw on edit instead fixes it
        setIsEditing(true);
    };

    const formFields = fields.map(field => {
        if (typeof field === "string" || field instanceof String) {
            return <label key={field}>{field}</label>;
        }

        const { id, label, value, required = false, secure = false, ...extraProps } = field;
        const fieldProps = {
            // From field
            key: id,
            id: id,
            label: label,
            value: userInput[value],

            // Defaults
            className: classes.textField,
            variant: "outlined",
            onChange: onChangeHandler,
            InputProps: { readOnly: !isEditing }
        };

        // Add extra field props
        if (extraProps) {
            for (const extraPropKey in extraProps) {
                fieldProps[extraPropKey] = extraProps[extraPropKey];
            }
        }

        if (secure) {
            fieldProps.InputProps = {
                readOnly: !isEditing,
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={showSecureHandler}
                            onMouseDown={showSecureHandler}>
                            {showPw ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            };

            // Disable/Remove multiline prop when hiding since they are mutually exclusive
            if (!showPw && fieldProps.multiline) fieldProps.multiline = false;

            fieldProps.type = showPw ? "text" : "password";
            // fieldProps.value = secureUserInputValue;
            fieldProps.className = `${classes.textField} ${classes.pwTextField}`;
        }

        required
            ? fieldProps.required = true
            : fieldProps.InputLabelProps = !isEditing && !userInput[value] ? { shrink: false } : {};

        return <TextField {...fieldProps}/>;
    });

    const icon = userInput && userInput.site ? dataType.icon(userInput.site) : "";

    return (
        <Modal className={classes.focusedViewWrapper} show={show} onClose={onClick}>
            <div className={classes.icon}>
                {icon}
            </div>
            <form className={`${classes.inputForm} ${!isEditing ? classes.readOnly : ""}`} onSubmit={onSubmitHandler}>
                {formFields}

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
        </Modal>
    );
};

export default FocusedView;
