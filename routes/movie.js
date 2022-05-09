const express = require("express");
const { searchMovie } = require("../controllers/movie");
const router = express.Router();

router.route("/search").get(searchMovie);
module.exports = router;
