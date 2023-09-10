const whitelist = process.env.WHITELISTED_DOMAINS ? process.env.WHITELISTED_DOMAINS.split(",") : []

// Adapted from https://stackoverflow.com/a/55195449
const corsOptions = {
    origin: (origin, callback) => {
        const isAllowed = !origin || whitelist.indexOf(origin) !== -1;
        const showError = process.env.SHOW_CORS_DOMAIN_ERROR.toLowerCase() === "true";
        callback(!isAllowed && showError ? new Error(`Domain ${origin} not allowed by CORS`) : null, isAllowed);
    },
    // origin: "http://localhost:8080",
    credentials: true
};

module.exports = corsOptions;
