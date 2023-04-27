const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    site: {
        type: String,
        required: true,
        default: ""
    },
    title: {
        type: String,
        required: true,
        default: ""
    },
    email: String,
    username: String,
    pw: {
        type: String,
        required: true
    },
    folders: [{
        type: String
    }],

    date: { type: Date, default: Date.now, required: true },
    lastAccess: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model("AccountTemplate", accountSchema);
