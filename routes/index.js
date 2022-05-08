const express = require("express");
const router = express.Router();

//all routes realted to authentication and authorization
router.use("/api/auth", require("./auth"));

// segregation of routes based on their model
router.use("/api/rating", require("./rating"));

router.use("/api/movie/", require("./movie"));

router.use("/api/user/", require("./user"));
module.exports = router;
