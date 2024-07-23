const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config(); 
 
const devMode = true;
const url = devMode ? "http://localhost:3000" : "https://chat-app-rust-psi.vercel.app"

try {
  mongoose.connect(devMode ? "mongodb://127.0.0.1:27017/chatapp" : "mongodb+srv://bdwnav:icandab1@cluster0.g0cxfsb.mongodb.net/chatapp");
  console.log("Successfully connected to the database.");
} catch (error) {
  console.error(error);
}

app.use(express.json());
app.use(cors({
  origin: url,
  credentials: true
}));

app.use(session({
  secret: "icandab1", 
  saveUninitialized: false,
  resave: false, 
  store: MongoStore.create({
    mongoUrl: devMode ? "mongodb://127.0.0.1:27017/chatapp" : "mongodb+srv://bdwnav:icandab1@cluster0.g0cxfsb.mongodb.net/chatapp",
    ttl: 14 * 24 * 60 * 60
  })
}));

const io = new Server(server, {
  cors: {
    origin: url,
    credentials: true,
    methods: ["GET", "POST"]
  }
});

const activeUsers = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if(userId) {
    activeUsers[userId] = socket.id;
  } else {
    return;
  }

  socket.on("disconnect", () => {
    delete activeUsers[userId];
  });
});

module.exports = { io, activeUsers, devMode, url };

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require("./routes/api"));

server.listen(3001, () => {
  console.log("Listening on port 3001.");
});