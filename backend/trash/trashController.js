const TrashTemplate = require("./trash.model");

/**
 * Moves item from model to trash.
 * @param model the model template.
 * @param type the data type string.
 * @param req the request.
 */
exports.moveToTrash = async (model, type, req) => {
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

/**
 * Retrieves all accounts, excluding pw field.
 */
exports.getAllAccounts = async (req, res) => {
    const data = await TrashTemplate.find().select("-pw");
    requestCatch({ "trash": data }, res);
};

/**
 * Deletes account with specified id.
 * @param req the request.
 * @param res the response.
 * @returns {Promise<void>} Returns HTTP 200 if successful;
 * Otherwise HTTP 410 if unsuccessful.
 */
exports.deleteAccount = async (req, res) => {
    try {
        await TrashTemplate.findByIdAndDelete(req.params.id);

        const successful = await TrashTemplate.countDocuments({ _id: req.params.id }) === 0;
        const code = successful ? 200 : 400;
        const message = successful ? "successful" : "unsuccessful";
        res.status(code).json({ message });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }

    // await request(AccountTemplate.findOne({ _id: req.params.id }), (product) => {
    //     return product.remove();
    // }, res, {
    //     success: ""
    // });
};

exports.getAccountById = async (req, res) => {
    const data = await TrashTemplate.findById(req.params.id).select("-pw");
    requestCatch(data, res);
};

exports.updateById = async (req, res) => {
    TrashTemplate.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        if (!doc) res.sendStatus(404);
        else if (err) res.status(500).json({ message: err.message })
        else res.sendStatus(200);
    });
    // requestCatch(data, res);
};

const requestCatch = (data, res) => {
    try {
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
