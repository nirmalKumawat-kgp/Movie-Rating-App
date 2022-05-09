const express = require("express");
const { newRating, editRating } = require("../controllers/rating");
const router = express.Router();
const { isAuthorized } = require("../middleware/isAuthorized");

router.route("/").post(isAuthorized, newRating);

router.route("/:ratingId").put(isAuthorized, editRating);

module.exports = router;
