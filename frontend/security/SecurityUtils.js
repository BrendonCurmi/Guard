import CryptoJS from "crypto-js";

/**
 * Generates hashes for the encryption key and the authentication hash.
 * @param password
 * @param salt
 * @returns {{encryptionHash: *, authHash: *}}
 */
const generateHashes = (password, salt) => {
    const keySize = 256;

    const encryptionKey = CryptoJS.PBKDF2(password, salt, {
        iterations: 100000,
        keySize: keySize / 32
    });
    const encryptionHash = CryptoJS.SHA256(encryptionKey).toString(CryptoJS.enc.Base64);

    const authKey = CryptoJS.PBKDF2(encryptionHash, salt, {
        iterations: 10,
        keySize: keySize / 32
    });
    const authHash = CryptoJS.SHA256(authKey).toString(CryptoJS.enc.Base64);

    return { encryptionHash, authHash };
};

// module.exports = { generateHashes };
export { generateHashes };
