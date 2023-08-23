let vault = null;

export const setVault = (vaultData) => {
    vault = vaultData;
};

export const getVault = () => {
    return { ...vault }; // Clone to prevent direct modification
};
