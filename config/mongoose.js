const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/codeial_development");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to mongoDB"));

db.once("open", function () {
  console.log("connected to Database mongoDB");
});

module.exports = db;
