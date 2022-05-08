require("dotenv").config({ path: "../config.env" });
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID,
  },
  auth: {
    apiKey: process.env.ELASTIC_API_KEY,
  },
});
// function to index data once into elastic cloud
const indexData = async () => {
  const movieData = require("../Movies2K");
  await Promise.all(
    movieData.map(async (movie, index) => {
      let updatedMovie = {};
      updatedMovie.title = movie.Title;
      try {
        await client.index({
          index: "movies",
          document: updatedMovie,
        });
      } catch (error) {
        console.log(error);
      }
    })
  );
  await client.indices.refresh({ index: "movies" });
  return "Indexed Successfully";
};

indexData()
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
