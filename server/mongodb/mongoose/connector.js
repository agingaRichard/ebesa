/*Code from Moz://a website

Link
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

*/
require("dotenv").config({
  path: require("find-config")(".env"),
});

//Import the mongoose module
var mongoose = require("mongoose").set("debug", true);

//Store URI
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const cluster = process.env.CLUSTER;
const dbname = process.env.DATABASE_NAME;

//const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
const uri = `mongodb+srv://cluster0.mongodb.net/test?retryWrites=true&w=majority, { user: username, pass: process.env.password, useNewUrlParser: true, useUnifiedTopology: true }`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Optional. Used to improve performance.
//mongoose.set('autoIndex', false);

//Get the default connection
var db = mongoose.connection;

//Check for connection or notify of errors
db.once("open", (_) => {
  console.log("Database connected!");
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

module.exports = db;
