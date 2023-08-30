const mongoose = require("mongoose");

// - CreatedAt:DateTime
// - Status
// - TimeLimit

const { model, Schema } = mongoose;

const AdminAttendanceSchema = new Schema({
  timeLimit: Number,
  status: String,
  createdAt: Date,
});

const AdminAttendance = model("AdminAttendance", AdminAttendanceSchema);
module.exports = AdminAttendance;
