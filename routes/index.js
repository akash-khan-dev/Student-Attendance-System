const router = require("express").Router();
const authRoute = require("./auth");
const userRouters = require("./users");

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", userRouters);

module.exports = router;
