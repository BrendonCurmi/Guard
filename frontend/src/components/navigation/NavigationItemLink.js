import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavigationItem from "./NavigationItem";

const NavigationItemLink = ({ name, to, icon, ...props }) => {
    return (
        <NavigationItem name={name}>
            <Link to={to} {...props}>
                <FontAwesomeIcon icon={icon}/>
                <span>{name}</span>
            </Link>
        </NavigationItem>
    );
};

export default NavigationItemLink;
