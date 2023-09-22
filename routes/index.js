const router = require("express").Router();
const authRoute = require("./auth");
const userRouters = require("./users");
const authenticate = require("../Middleware/authentication");
const adminAttendance = require("./admin-attendance");

router.use("/api/v1/users", authenticate, userRouters);
router.use("/api/v1/auth", authRoute);

router.use("/api/v1/admin/attendance", authenticate, adminAttendance);

module.exports = router;
