const { TrashTemplate } = require("./trash/trash.model.js");

class Profile {
    constructor(model, name) {
        this.model = model;
        this.name = name;

        Profile.profiles = { ...Profile.profiles, [name]: model };
    }

    // Map of item name: item template model
    static profiles = {};

    static getTemplate = (name) => {
        return Profile.profiles[name];
    };

    /**
     * Creates an item of the model template.
     */
    create = (req, res) => {
        new this.model({ ...req.body, user: req.userId })
            .save()
            .then(data => res.status(201).json(data))
            .catch(err => res.status(400).json({ err: err.message }));
    };

    /**
     * Deletes an item of the model template by moving it to trash.
     */
    delete = (req, res) => {
        this.moveToTrash(this.model, this.name, req)
            .then(() => res.sendStatus(200))
            .catch(err => res.status(400).json({ err: err.message }));
    };

    /**
     * Retrieves an item of the model template.
     */
    getById = (req, res) => {
        this.model.findById(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.status(400).json({ err: err.message }));
    };

    /**
     * Updates an item of the model template.
     */
    updateById = (req, res) => {
        this.model.findByIdAndUpdate(req.params.id, { ...req.body, lastAccess: Date.now() })
            .then(() => res.sendStatus(204))
            .catch(err => res.status(400).json({ err: err.message }));
    };

    /**
     * Moves item from model to trash.
     * Adapted from https://stackoverflow.com/a/38482125
     * @param model the model template.
     * @param type the data type string.
     * @param req the request.
     */
    moveToTrash = async (model, type, req) => {
        model.findOne({ _id: req.params.id }, (err, result) => {
            const swap = new TrashTemplate(result.toJSON());
            swap.type = type;

            swap.save();
            result.remove();
        });
    };
}

module.exports = Profile;
