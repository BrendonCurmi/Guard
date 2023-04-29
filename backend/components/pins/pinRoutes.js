const express = require("express");
const router = express.Router();

const PinController = require("./pinController");
const pinController = new PinController();

router.route("/pins").get(pinController.getAll);

router.route("/pin").post(pinController.create)

router.route("/pin/:id")
    .get(pinController.getById)
    .put(pinController.updateById)
    .delete(pinController.delete);

router.route("/pin/:id/credentials")
    .get(pinController.getCredentialsById);

module.exports = router;
