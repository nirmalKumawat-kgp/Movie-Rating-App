const express = require("express");
const { signup, login, logout } = require("../controllers/auth.js");
const { isAuthorized } = require("../middleware/isAuthorized");
const router = express.Router();

router.route("/login").post(login);

router.route("/signup").post(signup);

router.route("/logout").get(isAuthorized, logout);

module.exports = router;
