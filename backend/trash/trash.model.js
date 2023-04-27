const mongoose = require("mongoose");
const AccountTemplate = require("../accounts/accounts.model");

const trashSchema = AccountTemplate.schema.clone();
trashSchema.add({
    deletedDate: {
        type: Date, default: Date.now, required: true
    }
});

module.exports = mongoose.model("TrashTemplate", trashSchema, "trash");
