const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
    site: {
        type: String,
        required: true,
        default: ""
    },
    title: {
        type: String,
        required: true,
        default: ""
    },
    identity: String,
    pw: {
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

    date: { type: Date, default: Date.now, required: true },
    lastAccess: { type: Date, default: Date.now, required: true }
});

const AccountTemplate = mongoose.model("AccountTemplate", schema, "accounts");

const siteSchema = Joi.string();
const titleSchema = Joi.string();
const identitySchema = Joi.string();
const pwSchema = Joi.string();

const validateAccount = (account) => {
    const schema = Joi.object({
        site: siteSchema.required(),
        title: titleSchema.required(),
        identity: identitySchema,
        pw: pwSchema.required()
    });
    return schema.validate(account);
};

const validateUpdateAccount = (account) => {
    const schema = Joi.object({
        site: siteSchema,
        title: titleSchema,
        identity: identitySchema,
        pw: pwSchema
    });
    return schema.validate(account);
};

module.exports = { AccountTemplate, validateAccount, validateUpdateAccount };
