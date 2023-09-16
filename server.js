const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();

const { registerController, loginController } = require("./controller/auth");

const authorization = require("./Middelware/authentication");

const connectDb = require("./db");
app.use(express.json());
const User = require("./models/User");

app.post("/register", registerController);
app.post("/login", loginController);

// global error handle
app.use((err, _req, res, _nex) => {
  console.log(err);
  res.status(500).json({ message: "Server Error Occure" });
});

// giv json token
// create private route
app.get("/private", authorization, async (req, res, next) => {
  res.status(200).json({ message: "this is private" });
  console.log(`i am user ${req.user}`);
});

// create public route
app.get("/public", (req, res, next) => {
  res.status(400).json({ message: "this is public" });
});
// mongoose connection
connectDb("mongodb://127.0.0.1:27017/AttendaceSystem")
  .then(() => {
    console.log("database connected");
    app.listen(4000, () => {
      console.log("i am listening to 4000 port");
    });
  })
  .catch((err) => console.log(err));
