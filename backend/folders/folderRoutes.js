const express = require("express");
const router = express.Router();

const controller = require("./folderController");

router.route("/folders").get(controller.getAllFolders);

router.route("/folder").post(controller.createFolder);

router.route("/folder/:id")
    .get(controller.getFolderById)
    .put(controller.updateById)
    .delete(controller.deleteFolder);

module.exports = router;