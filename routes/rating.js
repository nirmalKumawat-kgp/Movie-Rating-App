const express = require("express");
const { newRating } = require("../controllers/rating");
const router = express.Router();
const { isAuthorized } = require("../middleware/isAuthorized");

router.route("/").post(isAuthorized, newRating);

module.exports = router;
