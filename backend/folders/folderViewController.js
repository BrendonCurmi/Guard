const FolderTemplate = require("./folders.model");
const AccountTemplate = require("../accounts/accounts.model");

exports.getFromFolder = async (req, res) => {
    const data = {};
    const folderName = req.query.f;
    const folderByName = await FolderTemplate.findOne({ name: folderName });
    if (!folderByName) return res.status(404).json({ ok: false });
    const folderId = folderByName._id;
    data.folders = await AccountTemplate.find({ "folders": folderId }).select("-pw");

    res.json(data);
};
