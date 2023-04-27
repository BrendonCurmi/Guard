const mongoose = require("mongoose");

const schema = new mongoose.Schema({
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
    // email: String,
    // username: String,
    identity: String,
    pw: {
        type: String,
        required: true
    },
    folders: [{
        type: mongoose.Schema.Types.ObjectId
    }],

    date: { type: Date, default: Date.now, required: true },
    lastAccess: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model("AccountTemplate", schema);
