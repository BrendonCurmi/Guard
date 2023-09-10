const express = require("express");
const router = express.Router();

const NoteController = require("./noteController");
const noteController = new NoteController();

const validateMiddleWare = require("../../middleware/validate");
const { validateNote } = require("./notes.model");

router.route("/notes").get(noteController.getAll);

router.route("/note").post([validateMiddleWare(validateNote)], noteController.create)

router.route("/note/:id")
    .get(noteController.getById)
    .put([validateMiddleWare(validateNote)], noteController.updateById)
    .delete(noteController.delete);

module.exports = router;
