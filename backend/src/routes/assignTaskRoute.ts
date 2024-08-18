import express from "express";
import {
  assignRole,
  getAllAssignedRoles,
  getOneAssignedRoleById,
  getOneAssignedRoleByIdAndName,
  getOnlyAllowedTasks,
} from "../controllers/assignTaskController.js";

const router = express.Router();

router.post("/post", assignRole);
router.get("/get", getAllAssignedRoles);
router.get("/get/:role/:task", getOneAssignedRoleById);
router.get("/getByIdandName/:role", getOneAssignedRoleByIdAndName);
router.get("/getTaskByRole/:role", getOnlyAllowedTasks);

export default router;
