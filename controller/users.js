const User = require("../models/User");
const { findUsers, findUserProperty } = require("../service/user");
const customError = require("../utils/customError");
const authService = require("../service/auth");
//get all users
const getUsers = async (req, res, nex) => {
  try {
    const user = await findUsers();
    return res.status(202).json(user);
  } catch (err) {
    nex(e);
  }
};
//get single user
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

//create users
const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;
  try {
    const user = await authService.registerService(
      name,
      email,
      password,
      roles,
      accountStatus
    );
    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

// delete user
const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await findUserProperty("_id", userId);
    if (!user) {
      throw customError("User Not Found", 404);
    }
    // TODO: call delete user all service

    user.deleteOne();
    return res.status(200).json("user deleted");
  } catch (e) {
    next(e);
  }
};
module.exports = {
  getUsers,
  getUsersID,
  postUser,
  deleteUser,
};
