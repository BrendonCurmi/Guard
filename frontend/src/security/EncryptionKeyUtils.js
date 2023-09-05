// Store the encryption key securely in memory
let encryptionKey = null;

const setEncryptionKey = (key) => {
    encryptionKey = key;
};

const getEncryptionKey = () => {
    if (!encryptionKey) {
        throw new Error("Encryption key has not been defined");
    }
    return encryptionKey;
};

module.exports = { setEncryptionKey, getEncryptionKey };
