const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Folder",
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

const FolderTemplate = mongoose.model("FolderTemplate", schema, "folders");

const validateFolder = (folder) => {
    const schema = Joi.object({
        email: Joi.string().required()
    });
    return schema.validate(folder);
};

module.exports = { FolderTemplate, validateFolder };
