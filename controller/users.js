const User = require("../models/User");
const { findUsers } = require("../service/user");

const getUsers = async (req, res, nex) => {
  try {
    const user = await findUsers();
    return res.status(202).json(user);
  } catch (err) {
    nex(e);
  }
};

module.exports = {
  getUsers,
};
