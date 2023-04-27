import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import CircleButton from "../buttons/CircleButton";
import FolderList from "./FolderList";

import { useFolders } from "../../store/FolderProvider";

import classes from "./Navigation.module.scss";

const NavigationFolderSection = () => {
    const [creatingFolder, setCreatingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const folders = useFolders();

    useEffect(folders.loadFolders, []);

    const edit = () => {
        setCreatingFolder(!creatingFolder);
    };

    const createFolder = async (event) => {
        event.preventDefault();
        const data = { name: newFolderName };

        const create = async () => {
            return await fetch("http://localhost:4000/api/folder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                mode: "cors",
                body: JSON.stringify(data)
            }).then(value => value.json())
        };

        create().then(folders.loadFolders);

        setNewFolderName("");
        setCreatingFolder(false);
    };

    return (
        <>
                <span className={classes.folders}>
                    <label>Folders</label>
                    <CircleButton tooltip="Add Folder" placement="right" onClick={edit}>
                        <FontAwesomeIcon icon={faFolderPlus}/>
                    </CircleButton>
                </span>
            <FolderList allFolders={folders.folders}/>
            {creatingFolder &&
                <form onSubmit={createFolder}>
                    <input type="text"
                           autoFocus={true}
                           value={newFolderName}
                           onChange={event => setNewFolderName(event.target.value)}/>
                </form>
            }
        </>
    );
};

export default NavigationFolderSection;
