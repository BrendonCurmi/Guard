const express = require("express");
const router = express.Router();

const vaultController = require("./vaultController");

router.route("/vault").get(vaultController.getVault);

module.exports = router;
