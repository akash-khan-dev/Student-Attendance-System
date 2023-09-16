const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  /**
     *request Input sources
     -req body
     -req params
     -req Query
     -req Header
     -req Cookies
     */
  // user information
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "please full fill the data" });
  }
  try {
    // find email like new email axist in before database
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already axist" });
    }
    //new user create
    user = new User({ name, email, password });
    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user.password = hash;
    user.save();
    return res.status(201).json({ message: "user created Successfully", user });
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // email validation
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
    // return successfull
    return res.status(200).json({ token });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerController,
  loginController,
};
