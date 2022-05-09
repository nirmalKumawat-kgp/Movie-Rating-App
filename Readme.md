# Movie Rating App Backend
This repositroy contains the backend built with ExpressJs framework using MongoDB as database. To provide search results of movie Elastic Search is used.

## Getting Started
This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.
<br>
### Installation

1. clone the repo <br>
> npm 
**`npm start`** - to start with node server.js <br>
**`npm run dev`** - to start with nodemon server.js

Add the following details in **`config.env`** <br>
 - JWT_SECRET_KEY = paste your jwt secret here
 - JWT_EXPIRES_IN = duration after which JWT expires
 - DATABASE_CONNECTION_URL = link to mongoDB database
 - ELASTIC_CLOUD_ID = cloud id of your elasticCloud deployment
 - ELASTIC_API_KEY = You elastic cloud API key
