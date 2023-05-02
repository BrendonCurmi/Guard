const express = require("express");
const router = express.Router();

const UserController = require("./userController");

router.route("/user").post(UserController.createUser);

module.exports = router;
