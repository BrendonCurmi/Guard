import React from "react";
import Modal from "../../modals/Modal";
import NiceButton from "../../buttons/NiceButton";

import classes from "./ConfirmView.module.scss";

const ConfirmView = ({ onCancel, onConfirm, confirm, show }) => {
    if (!show) return null;
    const { title, msg } = confirm;
    return (
        <Modal className={classes.view} show={show} onClose={onCancel}>
            <h2>{title}</h2>
            <h4>{msg}</h4>
            <NiceButton type="button"
                        onClick={onCancel}
                        color="secondary">Cancel</NiceButton>
            <NiceButton type="button"
                        onClick={onConfirm}
                        color="danger">Delete</NiceButton>
        </Modal>
    );
};

export default ConfirmView;
