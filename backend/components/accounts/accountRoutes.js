const express = require("express");
const router = express.Router();

const AccountController = require("./accountController");
const accountController = new AccountController();

const validateMiddleWare = require("../../middleware/validate");
const { validateAccount, validateUpdateAccount } = require("./accounts.model");

router.route("/accounts").get(accountController.getAll);

router.route("/account").post([validateMiddleWare(validateAccount)], accountController.create);

router.route("/account/:id")
    .get(accountController.getById)
    .put([validateMiddleWare(validateUpdateAccount)], accountController.updateById)
    .delete(accountController.delete);

module.exports = router;
