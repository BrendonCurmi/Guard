const FolderTemplate = require("./folders.model");

/**
 * Retrieves all accounts, excluding pw field.
 */
exports.getAllFolders = async (req, res) => {
    const data = await FolderTemplate.find();
    requestCatch(data, res);
};

exports.createFolder = (req, res) => {
    const test = new FolderTemplate({
        _id: req.body.id,
        name: req.body.name
    });
    test.save()
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(400).json({ message: err.message });
        });
};


/**
 * Deletes account with specified id.
 * @param req the request.
 * @param res the response.
 * @returns {Promise<void>} Returns HTTP 200 if successful;
 * Otherwise HTTP 410 if unsuccessful.
 */
exports.deleteFolder = async (req, res) => {
    try {
        await FolderTemplate.findByIdAndDelete(req.params.id);
        res.status(200).json({ });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

exports.getFolderById = async (req, res) => {
    const data = await FolderTemplate.findById(req.params.id);
    requestCatch(data, res);
};

exports.updateById = async (req, res) => {
    FolderTemplate.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
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
