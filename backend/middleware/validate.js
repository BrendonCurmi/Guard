// Adapted from https://gist.github.com/stongo/6359042
const validateMiddleware = (validator) => {
    return (req, res, next) => {
        const { error } = validator(req.body);
        if (error) return res.status(400).send({ err: error.details[0].message });
        next();
    }
};

module.exports = validateMiddleware;
