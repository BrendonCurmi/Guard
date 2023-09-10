const { AccountTemplate } = require("../accounts/accounts.model");
const { PinTemplate } = require("../pins/pins.model");
const { NoteTemplate } = require("../notes/notes.model");
const { FolderTemplate } = require("../folders/folders.model");
const TrashTemplate = require("../trash/trash.model");

exports.getVault = async (req, res) => {
    const userId = req.userId;
    const vaultData = {};

    vaultData["accounts"] = await AccountTemplate.find({ user: userId });
    vaultData["pins"] = await PinTemplate.find({ user: userId });
    vaultData["notes"] = await NoteTemplate.find({ user: userId });

    vaultData["folders"] = await FolderTemplate.find({ user: userId });

    vaultData["trash"] = await TrashTemplate.find({ user: userId });

    res.status(200).json(vaultData);
};
