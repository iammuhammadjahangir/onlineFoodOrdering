const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/userController");

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.get("/get", controller.getUsers);
router.get("/getAllUser", controller.getAllUser);
router.post("/changeUserRole/:userId", controller.ChangeUserRole);

module.exports = router;
