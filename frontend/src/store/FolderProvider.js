import React, { createContext, useContext, useEffect, useState } from "react";
import { safeFetch } from "../utils/SafeFetch";

export const FolderContext = createContext([]);

const FolderProvider = ({ children }) => {
    const loadFolders = () => {
        safeFetch("http://localhost:4000/api/folders")
            .then(value => value.json())
            .then(data => {
                const dict = {};
                data.forEach(obj => {
                    dict[obj._id] = obj.name;
                });
                setFoldersData(prevState => {
                    return { ...prevState, folders: dict };
                });
            });
    };

    const [foldersData, setFoldersData] = useState({
        folders: [],
        loadFolders
    });

    //useEffect(loadFolders, []);

    return (
        <FolderContext.Provider value={foldersData}>
            {children}
        </FolderContext.Provider>
    );
};

export const useFolders = () => useContext(FolderContext);

export default FolderProvider;
