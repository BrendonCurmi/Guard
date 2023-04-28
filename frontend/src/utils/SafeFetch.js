const safeFetch = (url, method = "GET", data) => {
    return fetch(url, {
        method: method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document.querySelector("meta[name='csrf-token']").getAttribute("content")
        },
        credentials: "include",
        // mode: "cors",
        body: JSON.stringify(data)
    }).catch(console.log);
};

module.exports = { safeFetch };
