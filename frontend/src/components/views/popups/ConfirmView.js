import React from "react";
import NiceButton from "../../buttons/NiceButton";

import classes from "./ConfirmView.module.scss";

const ConfirmView = ({ children, className, onCancel, onConfirm }) => {
    return (
        <div className={`${classes.view} ${className}`}>
            {children}
            <NiceButton type="button"
                        onClick={onCancel}
                        color="secondary">Cancel</NiceButton>
            <NiceButton type="button"
                        onClick={onConfirm}
                        color="danger">Delete</NiceButton>
        </div>
    );
};

export default ConfirmView;
