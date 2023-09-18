const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authorization(req, res, next) {
  // token varified
  try {
    //get user information
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "User Unauthorized" });
    }
    token = token.split(" ")[1];
    // matching user token
    const decoded = jwt.verify(token, "secretKey");

    //find user id
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(400).json({ message: "Unauthorized Token" });
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(400).json({ message: "Invalid Token" });
  }
}
module.exports = authorization;
