const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    const token = req.cookies["x-auth-token"];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.userId = decoded.userId;
            next();
        } catch (ex) {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;
