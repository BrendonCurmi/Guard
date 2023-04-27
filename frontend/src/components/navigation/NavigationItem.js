import React from "react";
import { Tooltip } from "@mui/material";

const NavigationItem = ({ name, children, ...props }) => {
    return (
        <Tooltip title={name} placement="right" enterDelay={1500} leaveDelay={200}>
            <li {...props}>
                {children}
            </li>
        </Tooltip>
    );
};

export default NavigationItem;
