import React from "react";

const NavigationItem = ({ name, children, ...props }) => {
    return (
        <li tooltip={name} tooltip-position="right" {...props}>
            {children}
        </li>
    );
};

export default NavigationItem;
