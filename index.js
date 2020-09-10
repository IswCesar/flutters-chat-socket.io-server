const express = require("express");
const path = require("path");
const { Console } = require("console");
require("dotenv").config();

// DB config
const { dbConnection } = require("./database/config");
dbConnection();

// Express app
const app = express();

// Read and parse http request
app.use(express.json());

// Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

// Public path
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// Our routes
app.use("/api/login", require("./routes/auth"));
app.use("/api/users/", require("./routes/users"));
app.use("/api/messages/", require("./routes/messages"));

// Config
server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(error);
  console.log("Servidor corriendo en puerto:", process.env.PORT);
});
