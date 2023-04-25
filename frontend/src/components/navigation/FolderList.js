import React from "react";
import { useFolder } from "../../store/FolderProvider";

import classes from "./FolderList.module.scss";

const FolderList = ({ folderListItems }) => {
    const allFolders = useFolder();
    return (
        <ul className={classes.navFolderList}>
            {
                Object.keys(allFolders).map((key, i) => {
                    const name = allFolders[key];
                    return folderListItems(name, i);
                })
            }
        </ul>
    );
};

export default FolderList;
