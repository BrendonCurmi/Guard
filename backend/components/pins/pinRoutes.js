const express = require("express");
const router = express.Router();

const pinController = require("./pinController");
const validateMiddleware = require("../../middleware/validate");
const { validatePin } = require("./pins.model");

router.route("/pin").post([validateMiddleware(validatePin)], pinController.create)

router.route("/pin/:id")
    .get(pinController.getById)
    .put([validateMiddleware(validatePin)], pinController.updateById)
    .delete(pinController.delete);

module.exports = router;
