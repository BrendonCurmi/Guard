const { FolderTemplate } = require("./folders.model");

const { AccountTemplate } = require("../accounts/accounts.model");
const { PinTemplate } = require("../pins/pins.model");
const { NoteTemplate } = require("../notes/notes.model");

exports.createFolder = (req, res) => {
    new FolderTemplate({ name: req.body.name, user: req.userId })
        .save()
        .then(data => res.status(201).json(data))
        .catch(err => res.status(400).json({ err: err.message }));
};

exports.deleteFolder = async (req, res) => {
    try {
        const folderId = req.params.id;
        await FolderTemplate.findByIdAndDelete(folderId);

        // Remove the folder id from other templates
        await AccountTemplate.updateMany({ folders: folderId }, { $pull: { folders: folderId } });
        await PinTemplate.updateMany({ folders: folderId }, { $pull: { folders: folderId } });
        await NoteTemplate.updateMany({ folders: folderId }, { $pull: { folders: folderId } });
        res.sendStatus(200);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};

exports.getFolderById = async (req, res) => {
    FolderTemplate.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(400).json({ err: err.message }));
};

exports.updateById = async (req, res) => {
    FolderTemplate.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        if (!doc) res.sendStatus(400);
        else if (err) res.status(400).json({ err: err.message })
        else res.sendStatus(204);
    });
};
