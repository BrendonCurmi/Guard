import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import NavigationItemLink from "./NavigationItemLink";

const NavigationFolderItem = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <NavigationItemLink onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            {...props}>
            {isHovered && (
                <>
                    <button><FontAwesomeIcon icon={faPencil}/></button>
                    <button><FontAwesomeIcon icon={faTrash}/></button>
                </>
            )}
        </NavigationItemLink>
    )
};

export default NavigationFolderItem;
