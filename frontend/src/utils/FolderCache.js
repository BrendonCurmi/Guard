import { getVault } from "./VaultCache";
import { decryptData } from "../../security/SecurityUtils";

// Cache for the folder ids and names
let folderCache = {};

export const loadFoldersFromCache = () => {
    const folders = getVault()["folders"];
    Object.keys(folders).map(key => {
        const { _id, name } = folders[key];
        folderCache[_id] = decryptData(name);
    });

    // Dispatch custom event to notify listeners about the cache update
    document.dispatchEvent(new CustomEvent("folderCacheUpdated", { detail: folderCache }));
}

export const getFoldersCache = () => {
    return { ...folderCache }; // Clone to prevent direct modification
};
