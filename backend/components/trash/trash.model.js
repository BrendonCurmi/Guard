const mongoose = require("mongoose");

const trashSchema = new mongoose.Schema({
    type: String,
    deletedDate: {
        type: Date, default: Date.now, required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, { strict: false });

module.exports = mongoose.model("TrashTemplate", trashSchema, "trash");
