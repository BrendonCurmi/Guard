const express = require("express");
const router = express.Router();

const AccountController = require("./accountController");
const accountController = new AccountController();

router.route("/accounts").get(accountController.getAll);

router.route("/account").post(accountController.create);

router.route("/account/:id")
    .get(accountController.getById)
    .put(accountController.updateById)
    .delete(accountController.delete);

module.exports = router;
