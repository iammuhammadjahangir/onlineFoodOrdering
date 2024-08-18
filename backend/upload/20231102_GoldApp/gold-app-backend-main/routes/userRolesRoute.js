const express = require("express");
const router = express.Router();
const controller = require("../controllers/userRolesController");

router.post("/post", controller.addRole);
router.get("/get", controller.getAllRoles);

module.exports = router;
