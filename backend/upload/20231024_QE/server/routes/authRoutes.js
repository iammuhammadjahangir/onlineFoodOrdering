const express = require("express");
const controller = require("../controllers/authController");
const controllers = require("../controllers/userController")
const router = express.Router();
const loginLimiter = require("../middleware/loginLimiter");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post("/post/login", loginLimiter, controller.login);
router.get("/get/refresh", controller.refresh);
router.post("/logout", controller.logout);


///**** user Controller */
router.post("/password/forgot", controllers.forgotPassword)
router.put('/password/reset/:token', controllers.resetPassword)
module.exports = router;
