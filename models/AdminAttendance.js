const mongoose = require("mongoose");

// - CreatedAt:DateTime
// - Status
// - TimeLimit

const { model, Schema } = mongoose;

const AdminAttendanceSchema = new Schema(
  {
    timeLimit: {
      type: Number,
      require: true,
      max: 30,
      min: 5,
      default: 5,
    },
    status: {
      type: String,
      require: true,
      enum: ["RUNNING", "COMPLETE"],
      default: "RUNNING",
    },
  },
  { timestamps: true }
);

const AdminAttendance = model("AdminAttendance", AdminAttendanceSchema);
module.exports = AdminAttendance;
