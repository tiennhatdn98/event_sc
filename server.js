const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  "/scripts",
  express.static(__dirname + "/node_modules/web3.js-browser/build")
);

mongoose.connect(
  "mongodb+srv://admin:admin123@minigame.ym2yo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  () => {
    console.log("Connect DB successfully!");
  }
);

require("./events/event");

server.listen(3000, function () {
  console.log("Server is running on port 3000");
});

require("./controllers/game")(app);
