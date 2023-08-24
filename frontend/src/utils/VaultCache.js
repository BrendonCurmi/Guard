import { safeFetch } from "./SafeFetch";
import { VAULT_API } from "./API";

let vault = null;

export const setVault = (vaultData) => {
    vault = vaultData;
};

export const getVault = () => {
    return { ...vault }; // Clone to prevent direct modification
};

export const loadVault = async () => {
    await safeFetch(VAULT_API)
        .then(res => res.json())
        .then(data => setVault(data))
        .catch(console.log);
};
