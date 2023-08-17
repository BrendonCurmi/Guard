// Store the encryption key securely in memory
let encryptionKey = null;

const setEncryptionKey = (key) => {
    encryptionKey = key;
};

const getEncryptionKey = () => {
    return encryptionKey;
};

module.exports = { setEncryptionKey, getEncryptionKey };
