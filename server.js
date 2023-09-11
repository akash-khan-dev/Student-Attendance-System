const express = require("express");

const app = express();

const connectDb = require("./db");

app.get("/", (req, res) => {
  const obj = {
    name: "akash",
    email: "akash@exmple.com",
  };
  res.json(obj);
});

connectDb("mongodb://127.0.0.1:27017/AttendaceSystem")
  .then(() => {
    console.log("database connected");
    app.listen("4000", () => {
      console.log("i am listening to 4000 port");
    });
  })
  .catch((err) => console.log(err));
