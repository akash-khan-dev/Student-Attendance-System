const mongoose = require("mongoose");

// - First Name
// - Last Name
// - Phone No
// - Profile Picture
// - UserId

const { model, Schema } = mongoose;

const profileSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNo: String,
  avatar: String,
  User: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const Profile = model("Profile", profileSchema);

module.exports = Profile;
