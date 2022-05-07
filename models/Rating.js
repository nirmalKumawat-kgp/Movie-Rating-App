const mongoose = require("mongoose");
const { Schema } = mongoose;

const RatingSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
