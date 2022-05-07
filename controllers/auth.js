const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc login controller
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please Provide all the neccessary details", 400)
    );
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      //if passwords do not match increment loginAttempts
      user.loginAttempts += 1;
      await user.save();

      // if after incrementing loginAttempts it becomes 4 send limit exceeded message
      if (user.loginAttempts === 4) {
        // reseting the loginAttempts after 30 minuts
        setTimeout(async () => {
          user.loginAttempts = 0;
          await user.save();
        }, 1000 * 60 * 30);

        return next(
          new ErrorResponse(
            "Login Limit Exceeded,Please Try Again After 30 minutes",
            401
          )
        );
      } else {
        return next(new ErrorResponse("Invalid Credentials", 401));
      }
    }

    if (isMatch) {
      user.loginAttempts = 0;

      await user.save();

      sendToken(user, "Logged In Successfully", res);
    }
  } catch (error) {
    next(error);
  }
};

//@desc logout controller
exports.logout = async (req, res, next) => {
  return res
    .clearCookie("accessToken")
    .status(200)
    .json({ success: true, message: "Logged Out Successfully" });
};

// @desc signup controller
exports.signup = async (req, res, next) => {
  const { name, age, email, password } = req.body;

  if (!email || !name || !age || !password) {
    return next(
      new ErrorResponse("Please Provide all the neccessary details", 400)
    );
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorResponse("User Already Exists", 400));
    }

    user = await User.create({ name, email, age, password });

    sendToken(user, "Account Created Successfully", res);
  } catch (error) {
    next(error);
  }
};

// @desc function to send token
const sendToken = (user, message, res) => {
  const token = user.getSignedJwtToken();

  res
    .cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 900000,
    })
    .status(200)
    .json({ success: true, message: message });
};
