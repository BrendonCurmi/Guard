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

router.route("/account/:id/credentials")
    .get(accountController.getCredentialsById);

router.route("/search/:str")
    .get(accountController.searchByString);

module.exports = router;
