const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/frontendAuthController");



router.post("/auth", controller.frontEndAuth);
// router.post("/allowUser/:uniqueKey/:status", controller.UserVerify);

module.exports = router;
