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

const TrashTemplate = mongoose.model("TrashTemplate", trashSchema, "trash");

module.exports = { TrashTemplate };
