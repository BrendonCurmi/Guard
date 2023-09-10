const { AccountTemplate } = require("./accounts.model");
const Profile = require("../profile");

class AccountController extends Profile {
    constructor() {
        super(AccountTemplate, "accounts");
    }
}

module.exports = new AccountController();
