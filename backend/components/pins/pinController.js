const { PinTemplate } = require("./pins.model");
const Profile = require("../profile");

class PinController extends Profile {
    constructor() {
        super(PinTemplate, "pins");
    }
}

module.exports = PinController;
