var express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
// var cors = require("cors");

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../react-client/dist"));
app.use("/", require("../routes/router"));
// app.use(cors());

var port = 8080;

app.listen(port, function() {
  console.log(`listening on http://localhost:${port}`);
});

// Bilel Addition here :

const verifyToken = require("./Middleware/verifyToken");

app.post("/api/test", verifyToken, (req, res) => {
  // session verification
  res.json({ posts: { title: "post test 1 " } });
});
// This basically tells the server to let react router handle routes when you refresh the page or enter a URL different from the root URL. in other words, a path like http://localhost:8080/men/tops would be served by the react router in the front and not by the server in the back
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../react-client/dist", "index.html"));
});
