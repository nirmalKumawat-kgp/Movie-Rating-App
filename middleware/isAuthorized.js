require("dotenv").config({ path: "../config.env" });
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
exports.isAuthorized = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(new ErrorResponse("Not Authorized to access this route", 401));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return next(new ErrorResponse("No user found", 404));
    }

    req.user = user; // making the user details except password accessible on req object

    next();
  } catch (error) {
    next(error);
  }
};
