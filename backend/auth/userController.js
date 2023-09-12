const jwt = require("jsonwebtoken");

const { UserTemplate } = require("./users.model");
const { saltAndHash, hash } = require("../security/hashing");

const accessTokenCookieName = "x-auth-token";

const sendCookies = (user, res) => {
    const payload = {
        userId: user._id
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "25m" });

    const options = {
        httpOnly: true,
        sameSite: true,
        secure: true,
        maxAge: 25 * 60 * 1000 //25 mins
    };

    res.cookie(accessTokenCookieName, accessToken, options);
    return accessToken;
};

exports.createUser = async (req, res) => {
    await new UserTemplate({
        email: req.body.email,
        username: req.body.username,
        authHash: saltAndHash(req.body.authHash)
    })
        .save()
        .then(user => {
            const accessToken = sendCookies(user, res);
            res.status(201).json({ accessToken });
        })
        .catch(err => res.status(400).json({ err: err.message }));
};

exports.loginUser = (req, res) => {
    const { username, authHash } = req.body;
    UserTemplate.findOne({ username })
        .then((user) => {
            const [userSalt, userHash] = atob(user.authHash).split("$");
            const loginHash = hash(authHash, Buffer.from(userSalt, "base64"));

            if (userHash !== loginHash) {
                return res.status(401).json({ err: "Authentication failed" })
            }

            const accessToken = sendCookies(user, res);
            res.status(200).json({ accessToken });
        })
        .catch(() => res.status(400).json({ err: "User does not exist" }));
};

exports.logoutUser = (req, res) => {
    res.clearCookie(accessTokenCookieName, {
        httpOnly: true,
        secure: true
    });
    res.sendStatus(200);
};
