require("dotenv").config({
  path: require("find-config")(".env"),
});

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const routes = require("./mongodb/mongoose/routes");

//Authentication
const passport = require("passport");
//require("./mongodb/mongoose/config/passport");
const flash = require("connect-flash");
const bodyParser = require("body-parser");

//Storing uri for MongoStore
username = process.env.USERNAME;
password = process.env.PASSWORD;
cluster = process.env.CLUSTER;
dbname = process.env.DATABASE_NAME;
const uri = `mongodb+srv: //${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;

//Get connection to MongoDB Atlas
const db = require("./mongodb/mongoose/connector");
//db.Promise = global.Promise

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// session secret
app.use(passport.initialize());
app.use(flash());
app.use(cors());

//const port = process.env.PORT || 5000;

// ==== if it is in a production environment...
/*if (process.env.NODE_ENV === "production") {
  const path = require("path");
  console.log("YOU ARE IN THE PRODUCTION ENV");
  app.use("/static", express.static(path.join(__dirname, "../build/static")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/"));
  });
}*/

//Route addition
app.use(routes);

app.listen(port, () => {
  //var host = server.address().address
  /* perform a database connection when server starts
  db.connectToServer(function (err) {
    if (err) console.error(err);
  });*/
  console.log(`Server is now running on port: ${port}!`);
});

app.timeout = 5000;

export const backend = app();
