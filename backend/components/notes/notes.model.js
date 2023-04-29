const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: ""
    },
    note: String,
    folders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "folders"
    }],
    lastAccess: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model("NoteTemplate", schema, "notes");
