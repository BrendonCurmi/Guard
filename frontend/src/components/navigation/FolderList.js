import React from "react";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import NavigationFolderItem from "./NavigationFolderItem";
import { encode } from "../../utils/URLUtils";

import classes from "./FolderList.module.scss";

const FolderList = ({ allFolders }) => {
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
                allFolders && Object.keys(allFolders).map((key, i) => {
                    const name = allFolders[key];
                    return folderListItems(name, i);
                })
            }
        </ul>
    );
};

export default FolderList;
