require("dotenv").config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const connectDB = require("./config/db");

const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use(cookieParser());

//all routes are in index file of routes folder
app.use("/", require("./routes/index"));

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error : ${err.message}`);
  server.close(() => process.exit(1));
});
