const mongoose = require("mongoose");

// - Name
// - Email
// - Password
// - Roles
// - AccountStatus

const { model, Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10,
  },
  email: {
    type: String,
    validate: {
      validator: (v) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          v
        );
      },
      message: (prop) => `Invalide Emalil${prop.value}`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Min 6 charectior"],
    required: true,
  },
  roles: {
    type: [String],
    required: true,
    default: ["STUDENT"],
  },
  accountStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
    required: true,
  },
});

const User = model("User", UserSchema);
module.exports = User;
