import CryptoJS from "crypto-js";
import { getEncryptionKey } from "./EncryptionKeyUtils";

// One-Way Hashing

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

// Two-Way Encryption and Decryption

/**
 * Number of PBKDF2 iterations in key generation for AES.
 * @type {number}
 */
const iterations = 10000;

/**
 * AES-256 key size in bits.
 * @type {number}
 */
const keySize = 256;

/**
 * Calculate a Key and Initialisation Vector using PBKDF2.
 * @param masterKey the master key.
 * @param salt the salt.
 * @returns {{iv: unknown[], key: unknown[]}}
 */
const getKeyIV = (masterKey, salt) => {
    const keyAndIV = CryptoJS.PBKDF2(masterKey, salt, {
        keySize: keySize / 32,// keySize in 32-bit words, so divide bits by 32
        iterations,
        hasher: CryptoJS.algo.SHA256
    });
    return {
        key: keyAndIV.words.slice(0, 8),// keySize is 256 bits: 256 bits / 32 bits per word = 8 words
        iv: keyAndIV.words.slice(8, 12)// IV size is 128 bits: 128 bits / 32 bits per word = 4 words
    };
};

/**
 * Encrypt specified text using AES with CBC mode and Pkcs7 padding.
 * @param text the text to encrypt.
 * @param masterKey the master key.
 * @returns {{ciphertext: string, salt: string}} the encrypted ciphertext and salt.
 */
const encrypt = (text, masterKey) => {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);// 128 bits / 8 bits per byte = 16 bytes
    const { key, iv } = getKeyIV(masterKey, salt);
    const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.lib.WordArray.create(key), {
        iv: CryptoJS.lib.WordArray.create(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return {
        ciphertext: encrypted.toString(),
        salt: salt.toString()
    };
};

/**
 * Decrypt specified encrypted text.
 * @param encryptedText the encrypted text to decode.
 * @param masterKey the master key.
 * @param salt the salt.
 * @returns {string} the decrypted text.
 */
const decrypt = (encryptedText, masterKey, salt) => {
    const { key, iv } = getKeyIV(masterKey, CryptoJS.enc.Hex.parse(salt));
    const decrypted = CryptoJS.AES.decrypt(encryptedText, CryptoJS.lib.WordArray.create(key), {
        iv: CryptoJS.lib.WordArray.create(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};


const encryptData = (text) => {
    const { ciphertext, salt } = encrypt(text, getEncryptionKey());
    return salt + "$" + ciphertext;
};

const decryptData = (encryptedSaltedText) => {
    const [salt, encryptedText] = encryptedSaltedText.split("$");
    return decrypt(encryptedText, getEncryptionKey(), salt);
};

// module.exports = { generateHashes };
export { generateHashes, encryptData, decryptData };
