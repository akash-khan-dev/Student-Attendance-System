const router = require("express").Router();
const authRoute = require("./auth");
const userRouters = require("./users");
const authenticate = require("../Middelware/authentication");

router.use("/api/v1/users", authenticate, userRouters);
router.use("/api/v1/auth", authRoute);

module.exports = router;
