const express = require("express");
const router = express.Router();

const noteController = require("./noteController");
const validateMiddleware = require("../../middleware/validate");
const { validateNote } = require("./notes.model");

router.route("/note").post([validateMiddleware(validateNote)], noteController.create)

router.route("/note/:id")
    .get(noteController.getById)
    .put([validateMiddleware(validateNote)], noteController.updateById)
    .delete(noteController.delete);

module.exports = router;
