const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserProperty, createNewUser } = require("./user");
const Costomerror = require("../utils/customError");
const registerService = async (name, email, password) => {
  // find email like new email axist in before database
  let user = await findUserProperty("email", email);
  if (user) {
    throw Costomerror("User already axist", 400);
  }
  //password hashing\
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  //new user create
  return createNewUser({ name, email, password: hash });
};
// login service
const loginService = async (email, password) => {
  const user = await findUserProperty("email", email);
  if (!user) {
    throw Costomerror("User Credential", 400);
  }

  // password validation
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw Costomerror("User Credential", 400);
  }
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };

  return jwt.sign(payload, "secretKey", { expiresIn: "2h" });
};

module.exports = {
  registerService,
  loginService,
};
