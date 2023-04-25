import React, { createContext, useContext, useState } from "react";
import useAsync from "../hooks/use-async";

export const FolderContext = createContext([]);

const FolderProvider = ({ children }) => {
    const [folders, setFolders] = useState([]);

    const getFolders = async () => {
        const rawResponse = await fetch("http://localhost:4000/api/folders", {
            method: "GET"
        });

        if (rawResponse.status === 200) {
            return await rawResponse.json();
        }
    };

    useAsync(getFolders, data => {
            const dict = {};
            data.forEach(obj => {
                dict[obj._id] = obj.name;
            });
            setFolders(dict);
        }
    );

    return (
        <FolderContext.Provider value={folders}>
            {children}
        </FolderContext.Provider>
    );
};

export const useFolder = () => useContext(FolderContext);

export default FolderProvider;
