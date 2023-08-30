import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import FullView from "../../components/views/FullView";

import { decode, encode } from "../../utils/URLUtils";
import { getFoldersCache } from "../../utils/FolderCache";
import { getVault } from "../../utils/VaultCache";

const API = "http://localhost:4000/api/folderView";

const Folder = () => {
    const { name } = useParams();
    const folderName = decode(name);

    const navigate = useNavigate();
    const folders = getFoldersCache();

    function getIdFromFolderName(folders, folderName) {
        for (const id in folders) {
            if (folders[id] === folderName) {
                return id;
            }
        }
        return null;
    }

    /**
     * Gets an array of all the items from the specified
     * vault data that belong to the specified folder.
     * @param vaultData the encrypted vault data.
     * @param folderId the id of the folder.
     * @returns {Array} array of all items in folder.
     */
    function getItemsWithFolderId(vaultData, folderId) {
        const folderItems = [];
        for (const type in vaultData) {
            const items = vaultData[type];
            for (const item of items) {
                if (item.folders && item.folders.includes(folderId)) {
                    item.type = type;
                    folderItems.push(item);
                }
            }
        }
        return folderItems;
    }

    // Get items belonging to the current folder and organise them into a data object
    const folderData = {};
    const folderId = getIdFromFolderName(folders, folderName);
    const itemsInFolder = getItemsWithFolderId(getVault(), folderId);
    Object.keys(itemsInFolder).map(key => {
        const item = itemsInFolder[key];
        const itemType = item.type;
        if (folderData[itemType] === undefined) folderData[itemType] = [];
        folderData[itemType].push(item);
    });

    const deleteFolderHandler = async () => {
        const rawResponse = await fetch(`http://localhost:4000/api/folder/`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ search: folderName })
        });

        if (rawResponse.status === 200) {
            const content = await rawResponse.json();
            // console.log(content);
            // folders.loadFolders();
            navigate("/pass");
        }
    };

    //todo test what happens when deleting from folder
    return <FullView
        page={{
            title: folderName,
            actionTitle: "",
            timeName: "Last Used"
        }}
        confirm={{
            title: "Are you sure?",
            msg: "Do you really want to delete this? It can't be recovered once it's deleted"
        }}
        loadItems={folderData}
        loadApi={`${API}?f=${encode(folderName)}`}
        loadDeps={[name]}/>;
};

export default Folder;
