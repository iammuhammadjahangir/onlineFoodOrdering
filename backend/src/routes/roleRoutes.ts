import express from "express";
import { addRole, getAllRoles } from "../controllers/roleController.js";

const router = express.Router();

router.post("/post", addRole);
router.get("/get", getAllRoles);

export default router;
