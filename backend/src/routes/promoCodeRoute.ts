import express from "express";
import {
  newPromoCode,
  updatePromoCode,
  deletePromoCode,
  getAllPromoCodes,
  getPromoCodeById,
  updatePromoCodeStatus,
  updateUsedCount,
} from "../controllers/promoCodeController.js";

const router = express.Router();

// Admin Routes
router.post("/admin/new", newPromoCode);
router.put("/admin/status/:id", updatePromoCodeStatus);
router.put("/admin/count/:code", updateUsedCount);
router.put("/admin/:id", updatePromoCode);
router.delete("/admin/:id", deletePromoCode);

// Admin & Client Routes
router.get("/all", getAllPromoCodes);

// Client Routes
router.get("/:id", getPromoCodeById);

export default router;
