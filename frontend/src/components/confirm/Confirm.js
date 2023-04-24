import React from "react";
import NiceButton from "../buttons/NiceButton";

const Confirm = ({ children, className, onCancel, onConfirm }) => {
    return (
        <div className={className}>
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

export default Confirm;
