const FolderTemplate = require("./folders.model");
const AccountTemplate = require("../accounts/accounts.model");
const PinTemplate = require("../pins/pins.model");
const NoteTemplate = require("../notes/notes.model");

exports.getFromFolder = async (req, res) => {
    const data = {};
    const folderName = req.query.f;
    const folderByName = await FolderTemplate.findOne({ name: folderName });
    if (!folderByName) return res.status(404).json({ ok: false });
    const folderId = folderByName._id;
    data.accounts = await AccountTemplate.find({ "folders": folderId }).select("-pw");
    data.pins = await PinTemplate.find({ "folders": folderId }).select("-pin");
    data.notes = await NoteTemplate.find({ "folders": folderId }).select("-note");
    res.json(data);
};
