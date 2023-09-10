const express = require("express");
const router = express.Router();

const FolderController = require("./folderController");
const validateMiddleware = require("../../middleware/validate");
const { validateFolder } = require("./folders.model");

router.route("/folder").post([validateMiddleware(validateFolder)], FolderController.createFolder);

router.route("/folder/:id")
    .get(FolderController.getFolderById)
    .put([validateMiddleware(validateFolder)], FolderController.updateById)
    .delete(FolderController.deleteFolder);

module.exports = router;
