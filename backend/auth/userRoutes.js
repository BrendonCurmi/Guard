const express = require("express");
const router = express.Router();

const UserController = require("./userController");

router.route("/user").post(UserController.createUser);

router.route("/login").post(UserController.loginUser);

router.route("/logout").post(UserController.logoutUser);

module.exports = router;
