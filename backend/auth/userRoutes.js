const express = require("express");
const router = express.Router();

const UserController = require("./userController");
const validateMiddleware = require("../middleware/validate");
const { validateUser, validateLogin } = require("./users.model");

router.route("/user").post([validateMiddleware(validateUser)], UserController.createUser);

router.route("/login").post([validateMiddleware(validateLogin)], UserController.loginUser);

router.route("/logout").post(UserController.logoutUser);

module.exports = router;
