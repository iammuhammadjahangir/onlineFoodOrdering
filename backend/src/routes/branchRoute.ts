import express from "express";
import {
  createBranch,
  deleteBranch,
  getAllBranches,
  getBranchById,
  getBranchesByFilter,
  updateBranch,
  updateBranchStatus,
} from "../controllers/branchController.js";

const router = express.Router();

router.post("/new", createBranch);
router.get("/getAll", getAllBranches);
router.get("/getByFilter", getBranchesByFilter);
router.put("/update/:id", updateBranch);
router.put("/updateStatus/:id", updateBranchStatus);
router.delete("/delete/:id", deleteBranch);
router.get("/get/:id", getBranchById);

export default router;
