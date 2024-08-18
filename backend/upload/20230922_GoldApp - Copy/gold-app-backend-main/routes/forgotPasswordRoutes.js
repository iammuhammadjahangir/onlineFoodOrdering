const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/forgotPasswordController");

router.get("/verifyUser", controller.protectForgotRoute);
router.post("/EmailVerify", controller.forgotPasswordEmailVerify);
router.post("/changePassword", controller.changePassword);
// router.post("/allowUser/:uniqueKey/:status", controller.UserVerify);

module.exports = router;
