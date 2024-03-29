const express = require("express");
const router = express.Router();

const trashController = require("./trashController");

router.route("/trash/:id/")
    .get(trashController.getById)
    .put(trashController.updateById)
    .delete(trashController.deletePermanently);

router.route("/trash/:id/restore").get(trashController.restoreFromTrash);

module.exports = router;
