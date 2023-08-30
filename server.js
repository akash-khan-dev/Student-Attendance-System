const express = require("express");

const app = express();

app.get("/", (req, res) => {
  const obj = {
    name: "akash",
    email: "akash@exmple.com",
  };
  res.json(obj);
});

app.listen("4000", () => {
  console.log("i am listening to 4000 port");
});
