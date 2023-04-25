const encode = (str) => {
    return encodeURIComponent(str).replace(/%20/g, "+");
};

const decode = (str) => {
    return decodeURIComponent(str.replace("+", /%20/g));
};

module.exports = { encode, decode };
