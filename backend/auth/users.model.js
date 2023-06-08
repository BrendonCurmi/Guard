const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    pw: {
        type: String,
        required: true
    },
    lastAccess: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model("UserTemplate", schema, "users");
