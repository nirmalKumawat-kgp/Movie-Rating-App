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
