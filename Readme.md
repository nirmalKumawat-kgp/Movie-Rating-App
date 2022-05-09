# Movie Rating App Backend
This repositroy contains the backend for taking ratings from user for movies.
<br>
This project has been built with the following technologies.
* [Expressjs](https://expressjs.com/)
* [MongoDB Atlas](https://www.mongodb.com/atlas)
* [ElasticCloud](https://www.elastic.co/cloud/)

## Getting Started
This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.
<br>
1. Clone the repo
   ```sh
   git clone https://github.com/nirmalKumawat-kgp/Movie-Rating-App.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the server
   ```
   npm start or npm run dev
   ``` 

Add the following details in **`config.env`** <br>
 - JWT_SECRET_KEY = paste your jwt secret here
 - JWT_EXPIRES_IN = duration after which JWT expires
 - DATABASE_CONNECTION_URL = link to mongoDB database
 - ELASTIC_CLOUD_ID = cloud id of your elasticCloud deployment
 - ELASTIC_API_KEY = You elastic cloud API key
## EndPoints
The following are endpoints to fetch required details (`http://localhost:PORT/`) : <br>
 * `POST`  `/api/auth/login` - to authenticate user and login
 * `POST`  `/api/auth/signup` - to create a new user
 * `GET`   `/api/auth/logout` - to logout user
 * `GET`   `/api/movie/search` - to search for movie provided query paramerter `q`
 * `POST`  `/api/rating/` - to add a new rating provided with `moviedId` in body
 * `PUT`   `/api/rating/:ratingId` - to edit a rating
 * `POST`  `/api/user/favourtieMovies` - to add favourite movies to user profile on first login
