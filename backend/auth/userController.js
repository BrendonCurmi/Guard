require("dotenv").config();

const UserTemplate = require("./users.model");

const { saltAndHash } = require("../security/encrypt");

exports.createUser = async (req, res) => {
    await new UserTemplate({
        email: req.body.email,
        username: req.body.user,
        pw: saltAndHash(req.body.pw),
    })
        .save()
        .then(data => res.status(201).json(data))
        .catch(err => res.status(400).json({ err: err.message }));
};

exports.loginUser = async (req, res) => {
    const { user, authHash } = req.body;
    UserTemplate.findOne({ username: user })
        .then((user) => {
            //keep access tokens in memory, refresh tokens in httponly cookie
            // const [salt, hash] = user.pw.split("$");
            // const newHash = hashKey(req.body.login, Buffer.from(salt, "base64"));

            const compare = user.pw === authHash;
            if (!compare) {
                return res.status(401).json({ err: "Authentication failed" })
            }

            const payload = {
                userId: user._id,
                userEmail: user.email
            };

            // const accessToken = sendCookies(res, payload);
            console.log("boo");

            // res.status(200).json({ accessToken });
            res.status(200).json({ msg: "ok" });
        })
        .catch(() => res.status(400).json({ err: "User does not exist" }));
};

exports.logoutUser = async (req, res) => {
    res.clearCookie(refreshTokenCookieName, {
        httpOnly: true,
        secure: true
    });
    res.clearCookie(accessTokenCookieName, {
        httpOnly: true,
        secure: true
    });
    res.status(204).json({ msg: "Logged out" });
};
