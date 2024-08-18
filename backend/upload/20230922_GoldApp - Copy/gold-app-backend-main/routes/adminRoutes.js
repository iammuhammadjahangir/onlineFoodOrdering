const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/adminRoleController"),
  { authAdmin } = require("../middleware/auth");

router.get("/getUnverifiedUser", authAdmin, controller.getUnverifiedUser);
router.post("/allowUser/:uniqueKey/:status", authAdmin, controller.UserVerify);

module.exports = router;
