const {
    pbkdf2Sync,
    randomBytes,
    scryptSync
} = require("node:crypto");

const hashKey = (authKey, salt) => {
    const iterations = 2;//todo 10,000
    const authHash = pbkdf2Sync(authKey, salt, iterations, 256, "sha256");
    const key = scryptSync(authHash, salt, 256);
    return key.toString("base64");
};

const saltAndHash = (authKey, salt = randomBytes(256)) => {
    const key = hashKey(authKey, salt);
    return salt.toString("base64") + "$" + key;
};

module.exports = { hashKey, saltAndHash };
