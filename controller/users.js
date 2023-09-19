const User = require("../models/User");
const { findUsers, findUserProperty, updateUser } = require("../service/user");
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

//update user by id
const putUserById = async (req, res, next) => {
  const userId = req.params.userId;
  const { name, email, roles, accountStatus } = req.body;
  try {
    const user = await updateUser(userId, {
      name,
      email,
      roles,
      accountStatus,
    });
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

// update user by id

const patchUserById = async (req, res, next) => {
  const userId = req.params.userId;
  const { name, roles, accountStatus } = req.body;
  try {
    const user = await findUserProperty("_id", userId);
    if (!user) {
      throw customError("User Not Found", 404);
    }
    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;
    user.save();
    return res.status(203).json(user);
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
    return res.status(203).send();
  } catch (e) {
    next(e);
  }
};
module.exports = {
  getUsers,
  getUsersID,
  postUser,
  deleteUser,
  patchUserById,
  putUserById,
};
