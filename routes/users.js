const route = require("express").Router();
const { getUsers, getUsersID } = require("../controller/users");

/**
 *@Method GET
 * Get user by id or email
 */
route.get("/:userId", getUsersID);

/**
 * Update user by id
 * @Method PUT
 */
route.put("/:userId");

/**
 * Update user by id
 * Method PATCH
 */
route.patch("/userId");
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
module.exports = route;
