import express from "express";
import { addTasks, getAllTasks } from "../controllers/taskController.js";

const router = express.Router();

router.post("/post", addTasks);
router.get("/get", getAllTasks);

export default router;
