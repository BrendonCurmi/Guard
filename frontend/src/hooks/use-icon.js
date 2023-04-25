import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SiteIcon from "../components/SiteIcon";

const useIcon = (icon, domain) => {
    return icon ? <FontAwesomeIcon icon={icon}/> : <SiteIcon domain={domain} size="32"/>;
};

export default useIcon;
