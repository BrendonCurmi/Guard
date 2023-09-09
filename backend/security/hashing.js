const { randomBytes, scryptSync } = require("node:crypto");

const hash = (key, salt) => {
    return scryptSync(key, salt, 32).toString("base64");
};

const saltAndHash = (authKey, salt = randomBytes(32)) => {
    return btoa(salt.toString("base64") + "$" + hash(authKey, salt));
};

module.exports = { hash, saltAndHash };
