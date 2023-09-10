const express = require("express");
const router = express.Router();

const pinController = require("./pinController");

const validateMiddleWare = require("../../middleware/validate");
const { validatePin } = require("./pins.model");

router.route("/pins").get(pinController.getAll);

router.route("/pin").post([validateMiddleWare(validatePin)], pinController.create)

router.route("/pin/:id")
    .get(pinController.getById)
    .put([validateMiddleWare(validatePin)], pinController.updateById)
    .delete(pinController.delete);

module.exports = router;
