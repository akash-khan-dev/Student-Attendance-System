const mongoose = require("mongoose");

// - Name
// - Email
// - Password
// - Roles
// - AccountStatus

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  roles: [String],
  accountStatus: String,
});

const User = model("User", UserSchema);
module.exports = User;
