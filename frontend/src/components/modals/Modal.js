import React from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.scss";

// Adapted from https://codesandbox.io/s/magical-christian-qxtdm?from-embed
const Modal = ({ className, show, onClose, children }) => {
    if (!show) return null;
    const modal = (
        <div className={classes.modal} onClick={onClose}>
            <div className={`${classes.modalContent} ${className}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
    return ReactDOM.createPortal(modal, document.getElementById("wrapper"));
};

export default Modal;
