const express = require("express");
const router = express.Router();

const controller = require("../controllers/dailyEntryController");

router.get("/get", controller.getDailyEntry);
router.post("/post", controller.postDailyEntry);
router.post("/post/customers", controller.postCustomersDailyEntry);
router.put(
  "/update/:custID/:reqGoldIn/:reqGoldOut/:reqCashIn/:reqCashOut",
  controller.updateDailyEntry
);

module.exports = router;
