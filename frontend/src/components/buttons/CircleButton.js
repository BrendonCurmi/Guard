import React from "react";
import { Tooltip } from "@mui/material";

import classes from "./CircleButton.module.scss";

const CircleButton = ({ color, children, tooltip, placement = "top", ...props }) => {
    return (
        <Tooltip title={tooltip} arrow placement={placement} enterDelay={500} leaveDelay={200}>
            <button {...props} className={`${classes.circleBtn} ${classes[color]}`}>
                {children}
            </button>
        </Tooltip>
    );
};

export default CircleButton;
