const express = require("express");
const router = express.Router();

const trashController = require("../controllers/trashController");
router.route("/trash").get(trashController.getAllAccounts);

router.route("/trash/:id/")
    .get(trashController.getAccountById)
    .put(trashController.updateById)
    .delete(trashController.deleteAccount);

module.exports = router;
