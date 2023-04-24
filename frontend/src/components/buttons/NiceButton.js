import React from "react";

import classes from "./NiceButton.module.scss";

const NiceButton = ({ color, children, ...props }) => {
    return (
        <button {...props}
                className={`${classes.button} ${classes[color]}`}>
            {children}
        </button>
    );
};

export default NiceButton;
