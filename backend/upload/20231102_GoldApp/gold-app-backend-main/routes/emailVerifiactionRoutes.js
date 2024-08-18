const express = require("express"),
	router = express.Router(),
	controller = require("../controllers/emailVerificationController");

router.get("/:uniqueKey", controller.EmailVerify);

module.exports = router;
