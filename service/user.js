const User = require("../models/User");

const findUsers = () => {
  return User.find();
};

const findUserProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

const createNewUser = ({ name, email, password }) => {
  const user = new User({ name, email, password });
  return user.save();
};
module.exports = {
  findUserProperty,
  createNewUser,
  findUsers,
};
