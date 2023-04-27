const express = require("express");
const router = express.Router();

const pinController = require("./pinController");

router.route("/pins").get(pinController.getAllPins);

router.route("/pin").post(pinController.createPins)

router.route("/pin/:id")
    .get(pinController.getPinById)
    .put(pinController.updateById)
    .delete(pinController.deletePin);

router.route("/pin/:id/credentials")
    .get(pinController.getCredentialsById);

module.exports = router;
