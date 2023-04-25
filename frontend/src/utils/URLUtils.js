const encode = (str) => {
    return encodeURIComponent(str).replace("%20", "+");
};

const decode = (str) => {
    return decodeURIComponent(str.replace("+", "%20"));
};

module.exports = { encode, decode };
