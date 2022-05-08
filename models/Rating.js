const mongoose = require("mongoose");
const { Schema } = mongoose;

const RatingSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      index: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    history: [
      {
        rating: Number,
        createdAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
