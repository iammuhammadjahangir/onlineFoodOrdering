import express from "express";
import {
  getOrderSummaryReport,
  getSearchedOrders,
  placeOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/placeOrder", placeOrder);
router.get("/allOrders", getSearchedOrders);
router.get("/summary", getOrderSummaryReport);
// router.get("/orderDeviceType", getOrderDeviceType);
// router.put("/updateStatus/:id", updateOrderStatus);
// router.post("/processPayment/:id", updatePaymentStatus);

export default router;
