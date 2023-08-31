const mongoose = require("mongoose");

const foldersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Folder",
        unique: true,
        validate: /[a-zA-Z0-9 _]/
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
});

module.exports = mongoose.model("FolderTemplate", foldersSchema, "folders");
