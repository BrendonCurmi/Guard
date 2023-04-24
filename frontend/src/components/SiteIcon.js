import React from "react";

/**
 * Creates an image of the icon of the specified domain.
 * @param domain the website url.
 * @param size the image size.
 * @constructor
 */
const SiteIcon = ({ domain, size }) => {
    console.log(domain, "SiteIcon");//todo remove
    const url = `https://www.google.com/s2/favicons?domain=${domain || "f"}&sz=${size}`;
    return (
        <img src={url}
             alt={domain ? "site icon" : ""}/>
    );
};

export default SiteIcon;
