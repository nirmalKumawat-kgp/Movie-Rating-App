const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
