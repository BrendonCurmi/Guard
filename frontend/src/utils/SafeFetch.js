const safeFetch = (url, method = "GET", data = {}) => {
    const init = {
        method: method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document.querySelector("meta[name='csrf-token']").getAttribute("content")
        },
        credentials: "include",
        // mode: "cors"
    };
    if (method !== "GET") {
        init.body = JSON.stringify(data);
    }
    return fetch(url, init);
    //.catch(console.log)
};

module.exports = { safeFetch };
