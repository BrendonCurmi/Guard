import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRightToBracket, faRightFromBracket, faGamepad, faUser, faFolder, faFolderPlus } from "@fortawesome/free-solid-svg-icons";

import NavigationItem from "./NavigationItem";
import NavigationItemLink from "./NavigationItemLink";
import NavigationFolderItem from "./NavigationFolderItem";
import FolderList from "./FolderList";

import { encode } from "../../utils/URLUtils";
import { useFolders } from "../../store/FolderProvider";

import classes from "./Navigation.module.scss";

/**
 * Creates the Navigation of the app.
 * @param props nav properties.
 * @constructor
 */
const Navigation = (props) => {
    const auth = props.auth;
    const [creatingFolder, setCreatingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const loginData = {
        link: auth ? "/logout" : "/login",
        text: auth ? "Logout" : "Login",
        icon: auth ? faRightFromBracket : faRightToBracket
    };

    const folderListItems = (name, i) => {
        const url = encode(name);
        return <NavigationFolderItem to={`/folder/${url}`}
                                     name={name}
                                     icon={faFolder}
                                     key={i}/>;
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

    return (
        <header className={classes.wrapper}>
            <div className={classes.sidebar}>
                <ul>
                    <NavigationItemLink to="/" name="Home" icon={faHouse}/>
                    <NavigationItemLink to={loginData.link} name={loginData.text} icon={loginData.icon}/>

                    <span className={classes.folders}>
                        <label>Folders</label>
                        <button tooltip="Add Folder" tooltip-position="right"
                                onClick={edit}>
                            <FontAwesomeIcon icon={faFolderPlus}/>
                        </button>
                    </span>
                    <FolderList folderListItems={folderListItems} allFolders={folders.folders}/>
                    {creatingFolder &&
                        <form onSubmit={createFolder}>
                            <input type="text"
                                   autoFocus={true}
                                   value={newFolderName}
                                   onChange={event => setNewFolderName(event.target.value)}/>
                        </form>
                    }

                    {auth && (
                        <NavigationItem name={props.email}>
                            <a className={classes.default}>
                                <FontAwesomeIcon icon={faUser}/>
                                <span>{props.email}</span>
                            </a>
                        </NavigationItem>
                    )}
                    {auth && (
                        <NavigationItemLink to="/test" name="Test" icon={faGamepad}/>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Navigation;
