import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavigationItem from "./NavigationItem";

const NavigationItemLink = (props) => {
    return (
        <NavigationItem name={props.name}>
            <Link to={props.to}>
                <FontAwesomeIcon icon={props.icon}/>
                <span>{props.name}</span>
            </Link>
        </NavigationItem>
    );
};

export default NavigationItemLink;
