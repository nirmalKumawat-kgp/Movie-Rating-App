const User = require("../models/User");
const Rating = require("../models/Rating");
const Movie = require("../models/Movie");

const ErrorResponse = require("../utils/errorResponse");

exports.addFavouriteMovies = async (req, res, next) => {
  const { ratings } = req.body;

  if (!ratings || ratings.length < 5) {
    return next(
      new ErrorResponse("Please provide 5 favourite movie details", 400)
    );
  }

  // creating an array of movieId to check if every movie is unique
  const uniqueMovies = ratings
    .map((rating, index) => rating.movieId)
    .filter((movieId, index, array) => array.indexOf(movieId) === index);

  // checking if all movies are unique that is sent by client
  if (uniqueMovies.length < 5) {
    return next(new ErrorResponse("Please Select Five Different Movies"));
  }
  const user = await User.findById(req.user._id);

  try {
    await Promise.all(
      ratings.map(async (rating, index) => {
        let movie = await Movie.findById(rating.movieId);

        const movieRating = await Rating.create({
          movie: movie._id,
          author: user._id,
          rating: rating.rating,
        });

        movie.ratings.unshift(movieRating);

        await movie.save();

        user.ratings.unshift(movieRating);
        user.favouriteMovies.unshift(movie);
      })
    );
    user.lastLogin = Date.now();

    await user.save();

    res.status(201).json({ success: true });
  } catch (error) {
    return next(error);
  }
};
