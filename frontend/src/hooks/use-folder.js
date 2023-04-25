import React, { useState } from "react";

const useFolder = () => {
    const [allFolders, setFolders] = useState([]);
    const getAllFolders = async () => {
        const getAllFoldersDict = await fetch("http://localhost:4000/api/folders", {
            method: "GET"
        })
            .then(value => value.json())
            .then(data => {
                const dict = {};
                data.forEach(obj => {
                    dict[obj._id] = obj.name;
                });
                return dict;
            });
        setFolders(getAllFoldersDict);
    };
    return [allFolders, getAllFolders];
};

export default useFolder;
