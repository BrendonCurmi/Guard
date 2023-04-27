const TrashTemplate = require("../trash/trash.model.js");

class Profile {
    constructor(model, name, secure) {
        this.model = model;
        this.name = name;
        //todo trash uncomment
        this.secure = secure;

        // Bind to keep this context
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.getById = this.getById.bind(this);
        this.updateById = this.updateById.bind(this);
        this.getCredentialsById = this.getCredentialsById.bind(this);

        const getExclude = () => {
            let excludes = "";
            if (secure instanceof Array) {
                for (let i = 0; i < secure.length; i++)
                    excludes += `-${secure[i]} `;
            } else if (typeof secure === "string") {
                excludes = `-${secure}`;
            }
            return excludes;
        };
        this.exclude = getExclude();
    }

    request = async (promise, action, res, messages) => {
        if (!messages) {
            messages = { success: "Successful", unsuccessful: "Unsuccessful", notFound: "Not Found" };
        }
        promise
            .then(value => {
                if (value) {
                    action(value)
                        .then(value => {
                            console.log("1");
                            res.status(200).json({ messages: messages.success, value: value });
                        })
                        .catch(err => {
                            console.log("2");
                            res.status(400).json({ messages: messages.success, err: err.message });
                        });
                } else {
                    console.log("3");
                    res.status(404).json({ messages: messages.notFound });
                }
            })
            .catch(err => {
                console.log("4");
                res.status(500).json({ messages: messages.success, err: err.message });
            });

        // const value = await promise;
        // if (value) {
        //     const val = await action(value);
        //
        // } else {
        //
        // }
    };

    requestCatch(data, res) {
        try {
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    /**
     * Retrieves all, excluding secure field.
     */
    async getAll(req, res) {
        const data = await this.model.find().select(this.exclude);
        this.requestCatch({ [this.name]: data }, res);
    }

    async create(req, res) {
        new this.model({ ...req.body })
            .save()
            .then(data => {
                res.status(201).json(data);
            })
            .catch(err => {
                res.status(400).json({ message: err.message });
            });
    }

    async delete(req, res) {
        try {
            await this.moveToTrash(this.model, this.name, req);
            res.status(200).json({ message: "ok" });
        } catch (err) {
            res.status(500).json({ err: err.message });
        }
    }

    /**
     * Moves item from model to trash.
     * @param model the model template.
     * @param type the data type string.
     * @param req the request.
     */
    moveToTrash = async (model, type, req) => {
        model.findOne({ _id: req.params.id }, (err, result) => {
            const swap = new TrashTemplate(result.toJSON());
            swap.type = type;

            /*
            swap._id = mongoose.Types.ObjectId()
            swap.isNew = true
            */

            swap.save();
            result.remove();
        });
    };

    async getById(req, res) {
        const data = await this.model.findById(req.params.id).select(this.secure);
        this.requestCatch(data, res);
    }

    async updateById(req, res) {
        await this.model.findByIdAndUpdate(req.params.id, req.body)
            .then(data => {
                res.sendStatus(204);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ message: err.message });
            });

        //        TrashTemplate.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        //             if (!doc) res.sendStatus(404);
        //             else if (err) res.status(500).json({ message: err.message })
        //             else res.sendStatus(200);
        //         });
    }

    /**
     * Retrieves only the secure field of the specified profile,
     * while updating  lastAccess property.
     */
    async getCredentialsById(req, res) {
        const data = await this.model.findOneAndUpdate({ _id: req.params.id }, { lastAccess: Date.now() }).select(this.secure);
        this.requestCatch(data, res);
    }
}

module.exports = Profile;
