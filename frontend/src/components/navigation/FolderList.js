import React, { useEffect, useState } from "react";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import NavigationFolderItem from "./NavigationFolderItem";
import { encode } from "../../utils/URLUtils";
import { getFoldersCache } from "../../utils/FolderCache";

import classes from "./FolderList.module.scss";

const FolderList = () => {
    const [folderCache, setFolderCache] = useState(getFoldersCache());

    useEffect(() => {
        // Listen for the folder update event to update state and reload component
        const updateCacheListener = event => setFolderCache(event.detail);

        document.addEventListener("folderCacheUpdated", updateCacheListener);

        return () => document.removeEventListener("folderCacheUpdated", updateCacheListener);
    }, []);

    const folderListItems = (name, i) => {
        const url = encode(name);
        return <NavigationFolderItem to={`/folder/${url}`}
                                     name={name}
                                     icon={faFolder}
                                     key={i}/>;
    };
    return (
        <ul className={classes.navFolderList}>
            {
                folderCache && Object.keys(folderCache).map(id => {
                    const name = folderCache[id];
                    return folderListItems(name, id);
                })
            }
        </ul>
    );
};

export default FolderList;
