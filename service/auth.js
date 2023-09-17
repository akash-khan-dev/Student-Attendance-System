const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserProperty, createNewUser } = require("./user");
const registerService = async (name, email, password) => {
  // find email like new email axist in before database
  let user = await findUserProperty("email", email);
  if (user) {
    const error = new Error("User already axist");
    error.status = 400;
    throw error;
  }
  //password hashing\
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  //new user create
  return createNewUser({ name, email, password: hash });
};
// login service
const loginService = async () => {
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User Credential" });
  }

  // password validation
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: "User Credential" });
  }
  // not show user password
  delete user._doc.password;

  const token = jwt.sign(user._doc, "secretKey", { expiresIn: "2h" });
};

module.exports = {
  registerService,
  loginService,
};
