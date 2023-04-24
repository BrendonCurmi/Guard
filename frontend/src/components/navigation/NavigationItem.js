import React from "react";

const NavigationItem = (props) => {
    return (
        <li tooltip={props.name} tooltip-position="right">
            {props.children}
        </li>
    );
};

export default NavigationItem;
