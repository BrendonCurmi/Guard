const AccountTemplate = require("./accounts.model");
const Profile = require("../profile");

class AccountController extends Profile {
    constructor() {
        super(AccountTemplate, "accounts", "pw");
    }

    searchByString = async (req, res) => {
        let str = { "$regex": req.params.str };
        await AccountTemplate.find({
            $or: [
                { "site": str },
                { "title": str },
                { "email": str },
                { "username": str }
            ]
        }).then(data => {
            res.status(201).json(data);
        }).catch(err => {
            res.status(500).json({ message: err.message });
        });
    };
}

module.exports = AccountController;
