import React from "react";
import Modal from "./Modal";
import NiceButton from "../buttons/NiceButton";

import classes from "./ConfirmModal.module.scss";

const ConfirmModal = ({ onCancel, onConfirm, confirm }) => {
    const { title, msg } = confirm;
    return (
        <Modal className={classes.confirmModalWrapper} onClose={onCancel}>
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

export default ConfirmModal;
