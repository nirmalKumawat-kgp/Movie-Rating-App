const express = require("express");
const { addFavouriteMovies } = require("../controllers/user");
const { isAuthorized } = require("../middleware/isAuthorized");

const router = express.Router();

router.route("/favourtieMovies").post(isAuthorized, addFavouriteMovies);

module.exports = router;
