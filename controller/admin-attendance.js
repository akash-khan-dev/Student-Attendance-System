const adminAttendance = require("../models/AdminAttendance");
const { addMinutes, isAfter } = require("date-fns");
const error = require("../utils/customError");
const getEnable = async (req, res, next) => {
  try {
    const running = await adminAttendance.findOne({ status: "RUNNING" });

    if (running) {
      throw error("Already Running", 400);
    }
    const attendance = new adminAttendance({});
    await attendance.save();
    return res.status(201).json({ message: "successful", attendance });
  } catch (e) {
    next(e);
  }
};

const getStatus = async (req, res, next) => {
  try {
    const running = await adminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw error("Not Running", 400);
    }
    const started = addMinutes(new Date(running.createdAt), running.timeLimit);
    if (isAfter(new Date(), started)) {
      running.status = "COMPLETE";
      await running.save();
    }
    return res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};
const getDisable = async (req, res, next) => {
  try {
    const running = await adminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw error("Not Running", 400);
    }
    running.status = "COMPLETE";
    await running.save();
    return res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getEnable,
  getDisable,
  getStatus,
};
