import { safeFetch } from "../utils/SafeFetch";
import { VAULT_API } from "../utils/API";
import { loadFoldersFromCache } from "./FolderCache";

let vault = null;

export const setVault = (vaultData) => {
    vault = vaultData;
};

export const getVault = () => {
    return { ...vault }; // Clone to prevent direct modification
};

export const loadVault = async () => {
    await safeFetch(VAULT_API)
        .then(res => res.data)
        .then(data => setVault(data))
        .then(loadFoldersFromCache)
        .catch(console.log);
};
