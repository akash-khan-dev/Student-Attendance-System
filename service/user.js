const User = require("../models/User");
// for find all user
const findUsers = () => {
  return User.find();
};

// for find sing user
const findUserProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

// for create new user

const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return user.save();
};

// // for delete user
// const deleteUser = (id) => {
//   User.findOneAndDelete(id);
// };
module.exports = {
  findUserProperty,
  createNewUser,
  findUsers,
};
