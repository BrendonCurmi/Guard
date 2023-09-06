const express = require("express");
const router = express.Router();

const NoteController = require("./noteController");
const noteController = new NoteController();

router.route("/notes").get(noteController.getAll);

router.route("/note").post(noteController.create)

router.route("/note/:id")
    .get(noteController.getById)
    .put(noteController.updateById)
    .delete(noteController.delete);

module.exports = router;
