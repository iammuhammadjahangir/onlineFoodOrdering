const express = require("express");
const router = express.Router();
const controller = require("../controllers/userAssignTasksController");

router.post("/post", controller.assignRole);
router.get("/get", controller.getAllAssignedRoles);
router.get("/get/:role/:task", controller.getOneAssignedRoleById);
router.get("/getByIdandName/:role", controller.getOneAssignedRoleByIdAndName);
router.get("/getTaskByRole/:role",controller.getOnlyAllowedTasks)

module.exports = router;
