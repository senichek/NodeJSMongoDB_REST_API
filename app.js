const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Connect to DB, see .env file;
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    });

// DB Connection status - 0: disconnected; 1: connected; 2: connecting; 3: disconnecting;
console.log("DB connection status: " + mongoose.connection.readyState);


// Import routes;
const postsRoute = require("./routes/posts");

// Every time you go to /posts the postsRoute will be used;
app.use("/posts", postsRoute);


app.listen(3000);