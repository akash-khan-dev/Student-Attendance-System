const { registerService, loginService } = require("../service/auth");

const registerController = async (req, res, next) => {
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
    //validation
    const user = await registerService(name, email, password);
    return res.status(201).json({ message: "user created Successfully", user });
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // email validation
    const token = await loginService({ email, password });
    // return successfull
    return res.status(200).json({ message: "login successful", token });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerController,
  loginController,
};
