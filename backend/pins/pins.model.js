const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: ""
    },
    pin: String,
    folders: [{
        type: String
    }],
    lastAccess: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model("PinTemplate", schema);
