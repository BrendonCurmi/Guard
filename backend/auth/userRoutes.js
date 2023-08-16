const express = require("express");
const router = express.Router();

const UserController = require("./userController");
const validateMiddleWare = require("../middleware/validate");
const { validateUser } = require("./users.model");

router.route("/user").post([validateMiddleWare(validateUser)], UserController.createUser);

router.route("/login").post(UserController.loginUser);

router.route("/logout").post(UserController.logoutUser);

module.exports = router;
