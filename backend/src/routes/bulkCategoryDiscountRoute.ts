import express from "express";
import {
  newBulkCategoryDiscount,
  updateBulkCategoryDiscount,
  deleteBulkCategoryDiscount,
  getAllBulkCategoryDiscounts,
  getBulkCategoryDiscountById,
  updateBulkCategoryStatus,
} from "../controllers/bulkCategoryDiscountController.js";

const router = express.Router();

// Admin Routes
router.post("/admin/new", newBulkCategoryDiscount);
router.put("/admin/status/:id", updateBulkCategoryStatus);
router.put("/admin/:id", updateBulkCategoryDiscount);
router.delete("/admin/:id", deleteBulkCategoryDiscount);

// Admin & Client Routes
router.get("/all", getAllBulkCategoryDiscounts);

// Client Routes
router.get("/:id", getBulkCategoryDiscountById);

export default router;
