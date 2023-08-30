const mongoose = require("mongoose");

// - UserId
// - CreatedAt:DateTime
// - AdminAttendanceId

const { model, Schema } = mongoose;
const StudentAttendanceSchema = new Schema({
  createdAt: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  adminAttendance: {
    type: Schema.Types.ObjectId,
    ref: "AdminAttendance",
  },
});

const StudentAttendance = model("StudentAttendance", StudentAttendanceSchema);

module.exports = StudentAttendance;
