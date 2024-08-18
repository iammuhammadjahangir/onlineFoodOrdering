const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/tradeFormController");
const { auth } = require("../middleware/auth");

router.post("/post", controller.postTradeForm);
router.get("/get", controller.getTradeForm);
router.get("/get/cashAndWeight", controller.calTradeFormCashAndWeight);
router.put("/delete/:id", controller.delete);
router.get("/getDateWise/:id/:checked", controller.getTradeDateWise);
router.get("/getTradeType/:type/:checked", controller.getTradeSpecificType);

module.exports = router;
