const route = require("express").Router();
const {
  getUsers,
  getUsersID,
  postUser,
  deleteUser,
  patchUserById,
  putUserById,
} = require("../controller/users");

/**
 *@Method GET
 * Get user by id or email
 */
route.get("/:userId", getUsersID);

/**
 * Update user by id
 * @Method PUT
 */
route.put("/:userId", putUserById);

/**
 * Update user by id
 * Method PATCH
 */
route.patch("/:userId", patchUserById);

route.delete("/:userId", deleteUser);
/*
 * get all users,include
 * filter
 * sort
 * pagination
 * select Property
 * @route /api/v1/users?sort=["by","name"]
 * @method GET
 * @visibility private
 */
route.get("/", getUsers);

/**
 * create new user
 */
route.post("/", postUser);
module.exports = route;
