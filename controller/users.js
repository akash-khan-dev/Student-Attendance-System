const User = require("../models/User");
const { findUsers, findUserProperty } = require("../service/user");
const customError = require("../utils/customError");

const getUsers = async (req, res, nex) => {
  try {
    const user = await findUsers();
    return res.status(202).json(user);
  } catch (err) {
    nex(e);
  }
};

const getUsersID = async (req, res, next) => {
  const userid = req.params.userId;
  console.log(userid);
  try {
    const user = await findUserProperty("_id", userid);
    if (!user) {
      throw customError("User not found", 404);
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
module.exports = {
  getUsers,
  getUsersID,
};
