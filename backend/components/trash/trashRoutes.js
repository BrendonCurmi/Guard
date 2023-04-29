const express = require("express");
const router = express.Router();

const TrashController = require("./trashController");
const trashController = new TrashController();

router.route("/trash").get(trashController.getAll);

router.route("/trash/:id/")
    .get(trashController.getById)
    .put(trashController.updateById)
    .delete(trashController.deleteAccount);

router.route("/trash/:id/restore").get(trashController.restoreFromTrash);

module.exports = router;
