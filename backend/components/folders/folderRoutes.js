const express = require("express");
const router = express.Router();

const FolderController = require("./folderController");
const validateMiddleWare = require("../../middleware/validate");
const { validateFolder } = require("./folders.model");

router.route("/folder").post([validateMiddleWare(validateFolder)], FolderController.createFolder);

router.route("/folder/:id")
    .get(FolderController.getFolderById)
    .put([validateMiddleWare(validateFolder)], FolderController.updateById)
    .delete(FolderController.deleteFolder);

module.exports = router;
