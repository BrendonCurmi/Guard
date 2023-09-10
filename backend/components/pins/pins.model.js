const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: ""
    },
    pin: {
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

const PinTemplate = mongoose.model("PinTemplate", schema, "pins");

const validatePin = (pin) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        pin: Joi.string().required(),
        folders: Joi.array().items(Joi.string().allow(""))
    });
    return schema.validate(pin);
};

module.exports = { PinTemplate, validatePin };
