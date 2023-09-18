const express = require("express");
const app = express();
const authorization = require("./Middelware/authentication");
const connectDb = require("./db");
app.use(express.json());
const routes = require("./routes/index");

//register and login router
app.use(routes);

// global error handle
app.use((err, _req, res, _nex) => {
  const message = err.message ? err.message : "Server Error Occure";
  const status = err.status ? err.status : 500;
  res.status(status).json({ message });
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
