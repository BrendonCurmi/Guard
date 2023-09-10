const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: ""
    },
    note: {
        type: String,
        required: true
    },
    folders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "folders"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    lastAccess: { type: Date, default: Date.now, required: true }
});

const NoteTemplate = mongoose.model("NoteTemplate", schema, "notes");

const validateNote = (note) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        note: Joi.string().required(),
        folders: Joi.array().items(Joi.string().allow(""))
    });
    return schema.validate(note);
};

module.exports = { NoteTemplate, validateNote };
