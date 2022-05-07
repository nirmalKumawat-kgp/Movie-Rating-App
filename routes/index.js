const express = require("express");
const router = express.Router();

router.use("/api/auth", require("./auth")); // auth routes are kept in auth.js
router.use("/api/rating", require("./rating"));
module.exports = router;
