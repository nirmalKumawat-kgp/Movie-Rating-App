# Movie Rating App Backend
This repositroy contains the backend built with ExpressJs framework using MongoDB as database. To provide search results of movie Elastic Search is used.

## Usage

**`npm start`** - to start with node server.js <br>
**`npm run dev`** - to start with nodemon server.js

Add the following details in **`config.env`** <br>
 - JWT_SECRET_KEY = paste your jwt secret here
 - JWT_EXPIRES_IN = duration after which JWT expires
 - DATABASE_CONNECTION_URL = link to mongoDB database
 - ELASTIC_CLOUD_ID = cloud id of your elasticCloud deployment
 - ELASTIC_API_KEY = You elastic cloud API key
