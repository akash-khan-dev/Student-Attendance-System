const route = require("express").Router();
const {
  getEnable,
  getDisable,
  getStatus,
} = require("../controller/admin-attendance");

route.get("/enable", getEnable);
route.get("/status", getStatus);
route.get("/disable", getDisable);

module.exports = route;
