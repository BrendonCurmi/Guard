const axios = require("axios");

const safeFetch = (url, method = "GET", data = {}) => {
    const config = {
        method: method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        withCredentials: true,// Include credentials (cookies) in the request
    };

    if (method !== "GET") {
        config.data = data;
    }

    return axios(url, config);
};

module.exports = { safeFetch };
