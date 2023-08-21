const AccountTemplate = require("../accounts/accounts.model");
const PinTemplate = require("../pins/pins.model");
const NoteTemplate = require("../notes/notes.model");
const FolderTemplate = require("../folders/folders.model");

exports.getVault = async (req, res) => {
    const id = req.params.id;
    const vaultData = {};

    vaultData["accounts"] = await AccountTemplate.find();
    vaultData["pins"] = await PinTemplate.find();
    vaultData["notes"] = await NoteTemplate.find();

    vaultData["folders"] = await FolderTemplate.find();

    res.status(200).json(vaultData);
};
