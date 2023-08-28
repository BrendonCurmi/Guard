import { getVault } from "./VaultCache";
import { decryptData } from "../../security/SecurityUtils";

// Cache for the folder ids and names
let folderCache = {};

export const loadFoldersFromCache = () => {
    const allFolders = getVault()["folders"];
    Object.keys(allFolders).map(key => {
        const { _id, name } = allFolders[key];
        folderCache[_id] = decryptData(name);
    });
    console.log(folderCache);
}

export const getFoldersCache = () => {
    return { ...folderCache }; // Clone to prevent direct modification
};
