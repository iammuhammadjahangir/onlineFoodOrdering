import express from "express";
import {
  newSubOption,
  getAllSubOptions,
  getSubOptionByCriteria,
  updateSubOptionById,
  deleteSubOptionById,
} from "../controllers/subOptionController.js";

const router = express.Router();

router.post("/post", newSubOption); // Create a new sub-option
router.get("/all", getAllSubOptions); // Get all sub-options
router.get("/search", getSubOptionByCriteria); // Get sub-option by ID, Branch, Item, or a combination
router.put("/:subOptionId", updateSubOptionById); // Update a sub-option by ID
router.delete("/:subOptionId", deleteSubOptionById); // Delete a sub-option by ID

export default router;
