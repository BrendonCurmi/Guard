const express = require("express");
const router = express.Router();

const accountController = require("./accountController");
const validateMiddleware = require("../../middleware/validate");
const { validateAccount, validateUpdateAccount } = require("./accounts.model");

router.route("/accounts").get(accountController.getAll);

router.route("/account").post([validateMiddleware(validateAccount)], accountController.create);

router.route("/account/:id")
    .get(accountController.getById)
    .put([validateMiddleware(validateUpdateAccount)], accountController.updateById)
    .delete(accountController.delete);

module.exports = router;
