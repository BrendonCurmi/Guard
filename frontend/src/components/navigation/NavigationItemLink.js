import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavigationItem from "./NavigationItem";

const NavigationItemLink = ({ name, to, icon, children, show = true, ...props }) => {
    return show ? (
        <NavigationItem name={name} {...props}>
            <Link to={to}>
                <FontAwesomeIcon icon={icon}/>
                <span>{name}</span>
            </Link>
            {children}
        </NavigationItem>
    ) : "";
};

export default NavigationItemLink;
