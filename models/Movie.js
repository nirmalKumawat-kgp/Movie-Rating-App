const mongoose = require("mongoose");
const { Schema } = mongoose;
const Rating = require("./Rating");
const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
  averageRating: { type: Number },
});

MovieSchema.methods.getAverageRating = async function () {
  let sumofRating = 0;
  await Promise.all(
    this.ratings.map(async (ratingId, index) => {
      const rating = await Rating.findById(ratingId);
      sumofRating += rating.rating;
    })
  );
  if (sumofRating === 0) {
    return 0;
  }
  const averageRating = sumofRating / this.ratings.length;
  return averageRating;
};

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
