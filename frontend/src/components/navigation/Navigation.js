import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRightToBracket, faRightFromBracket, faFolderPlus } from "@fortawesome/free-solid-svg-icons";

import NavigationItemLink from "./NavigationItemLink";
import FolderList from "./FolderList";
import CircleButton from "../buttons/CircleButton";

import { useAuth } from "../../context/AuthProvider";
import { useFolders } from "../../store/FolderProvider";

import classes from "./Navigation.module.scss";

/**
 * Creates the Navigation of the app.
 * @param props nav properties.
 * @constructor
 */
const Navigation = (props) => {
    const [creatingFolder, setCreatingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");

    const { auth } = useAuth();
    const isLoggedIn = auth?.user;
    const show = isLoggedIn;

    const loginData = {
        link: isLoggedIn ? "/logout" : "/login",
        text: isLoggedIn ? "Logout" : "Login",
        icon: isLoggedIn ? faRightFromBracket : faRightToBracket
    };

    const edit = () => {
        setCreatingFolder(!creatingFolder);
    };

    const folders = useFolders();

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

    useEffect(folders.loadFolders, []);

    const FolderSection = () => {
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

    return (
        <header className={classes.wrapper}>
            <div className={classes.sidebar}>
                <ul>
                    <NavigationItemLink to="/" name="Home" icon={faHouse}/>
                    <NavigationItemLink to={loginData.link} name={loginData.text} icon={loginData.icon}/>

                    {show && <FolderSection/>}
                </ul>
            </div>
        </header>
    );
};

export default Navigation;
