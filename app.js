const express = require("express");

const app = express();

const socket = require("socket.io");

app.use(express.static("public"));

// Handlebars

var exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to Postgres
const db = require("./config/dbConfig");

let connectToPostgres = async () => {
  try {
    db.authenticate();
    console.log("Connected to Postgres");
  } catch (error) {
    console.log(error);
  }
};

connectToPostgres();

// cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Use ENV

require("dotenv").config();

PORT = process.env.PORT || 3000;

// Routes
app.use("/", require("./controllers/HomePage"));
app.use("/", require("./controllers/Login"));
app.use("/", require("./controllers/Register"));
app.use("/", require("./controllers/CreateChannel"));

var server = app.listen(PORT, () =>
  console.log(`Server started on Port ${PORT}`)
);

// Socket setup

var io = socket(server);

io.on("connection", (socket) => {
  console.log("Made Socket connection", socket.id);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
});
