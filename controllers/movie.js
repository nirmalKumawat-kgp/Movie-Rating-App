require("dotenv").config({ path: "../config.env" });
const { Client } = require("@elastic/elasticsearch");
const Movie = require("../models/Movie");

//connecting to elastic cloud
const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID,
  },
  auth: {
    apiKey: process.env.ELASTIC_API_KEY,
  },
});

exports.searchMovie = async (req, res, next) => {
  const query = req.query.q;
  try {
    //refreshing the index before searching
    await client.indices.refresh({ index: "movies" });

    //searching the query in elasticSearch Index
    const result = await client.search({
      index: "movies",

      query: {
        bool: {
          should: [
            //applying mixture of different operators to get as accurate result as possible
            {
              match: { title: { query: query } },
            },
            {
              match: { title: { query: query, operator: "and", boost: 1 } },
            },
            {
              match_phrase: { title: { query: query, boost: 2 } },
            },
          ],
        },
      },
    });

    //creating array of movies after finding them in mongoDB database
    const movies = await Promise.all(
      result.hits.hits.map(async (movie, index) => {
        return await Movie.findOne({ title: movie._source.title });
      })
    );

    // responding with array of movies basaed on the search query
    return res.status(200).json({ success: true, data: movies });
  } catch (error) {
    next(error);
  }
};
