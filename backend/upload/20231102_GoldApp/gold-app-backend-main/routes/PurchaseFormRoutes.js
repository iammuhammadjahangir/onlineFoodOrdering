const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/purchaseFormController");
const { auth } = require("../middleware/auth");

router.post("/post", controller.postPurchaseForm);
router.get("/get", controller.getPurchaseForm);
router.get("/getCashSum", controller.getTotalPurchaseFormCash);
router.put("/delete/:id", controller.delete);
router.get("/getDateWise/:id/:checked", controller.getpurchaseDateWise);

module.exports = router;
