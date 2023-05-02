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
        .catch(err => res.status(400).json({ message: err.message }));
};
