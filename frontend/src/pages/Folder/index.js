import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import ListedPage from "../../components/listed/ListedPage";

import { decode, encode } from "../../utils/URLUtils";
import { getFoldersCache } from "../../storage/FolderCache";
import { getVault } from "../../storage/VaultCache";

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
            if (type === "folders" || type === "trash") continue;
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

    /**
     * Gets the items belonging to the current folder and
     * organises them into a data object.
     * @returns {JSON} data object of items in folder.
     */
    const getFolderData = () => {
        const folderData = {};
        const folderId = getIdFromFolderName(folders, folderName);
        const itemsInFolder = getItemsWithFolderId(getVault(), folderId);
        Object.keys(itemsInFolder).map(key => {
            const item = itemsInFolder[key];
            const itemType = item.type;
            if (folderData[itemType] === undefined) folderData[itemType] = [];
            folderData[itemType].push(item);
        });
        return folderData;
    };

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
    return <ListedPage
        page={{
            title: folderName,
            actionTitle: "",
            timeName: "Last Used"
        }}
        loadItems={getFolderData}
        loadApi={`${API}?f=${encode(folderName)}`}
        loadDeps={[name]}/>;
};

export default Folder;
