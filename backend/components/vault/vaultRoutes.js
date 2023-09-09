const express = require("express");
const router = express.Router();

const VaultController = require("./vaultController");

router.route("/vault").get(VaultController.getVault);

module.exports = router;
