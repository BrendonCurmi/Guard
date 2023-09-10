const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        min: 4,
        max: 30
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        min: 6,
        max: 30
    },
    authHash: {
        type: String,
        required: true,
    },
    lastAccess: { type: Date, default: Date.now, required: true }
});

const UserTemplate =  mongoose.model("UserTemplate", schema, "users");

const emailSchema = Joi.string().trim().lowercase().min(4).max(30).email();
const usernameSchema = Joi.string().trim().lowercase().min(6).max(30).alphanum();
const authHashSchema = Joi.string();

const validateUser = (user) => {
    const schema = Joi.object({
        email: emailSchema.required(),
        username: usernameSchema.required(),
        authHash: authHashSchema.required()
    });
    return schema.validate(user);
};

const validateLogin = (user) => {
    const schema = Joi.object({
        email: emailSchema.required(),
        authHash: authHashSchema.required()
    });
    return schema.validate(user);
};

module.exports = { UserTemplate, validateUser, validateLogin };
