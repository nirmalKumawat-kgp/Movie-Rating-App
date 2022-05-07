const Rating = require("../models/Rating");
const User = require("../models/User");
const Movie = require("../models/Movie");

const ErrorResponse = require("../utils/errorResponse");

exports.newRating = async (req, res, next) => {
  const { movieId } = req.body;

  const userId = req.user._id;

  try {
    let rating = await Rating.findOne({ movie: movieId, author: userId });
    //rating of that movie by particular user is already given
    if (rating) {
      return next(new ErrorResponse("Rating Already Exists", 400));
    }
    //ceating new rating if it doesnt exist
    rating = new Rating({ rating: req.body.rating });
    rating.author = userId;
    rating.movie = movieId;
    await rating.save();

    // populating ratings in User and Movie collection
    let user = await User.findById(userId);
    let movie = await Movie.findById(movieId);

    if (user && movie) {
      user.ratings.unshift(rating);
      movie.ratings.unshift(rating);
      await movie.save();
      await user.save();
      res
        .status(200)
        .json({ success: true, message: "Rating Given Successfully" });
    }
  } catch (error) {
    next(error);
  }
};
