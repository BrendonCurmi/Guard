import React from "react";

import classes from "./FolderList.module.scss";

const FolderList = ({ folderListItems, allFolders }) => {
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
