require("dotenv").config({ path: "../config.env" });
const Movie = require("../models/Movie");
const movieData = require("../Movies2K");
const mongoose = require("mongoose");
const initData = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connection to database established");
  } catch (error) {
    //to handle initial errors
    console.log(`Connection to database failed: ${error}`);
  }
  await Promise.all(
    movieData.map(async (movie, index) => {
      let updatedMovie = {};
      updatedMovie.title = movie.Title;
      try {
        const uploadedMovie = await Movie.create(updatedMovie);
      } catch (error) {
        console.log(error);
      }
    })
  );
  return "Uploaded Successfully";
};
initData().then((response) => console.log(response));
