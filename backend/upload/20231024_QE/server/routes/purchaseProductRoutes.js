const express = require("express");
const controller = require("../controllers/purchaseProductController");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {isAuthenticatedUser} = require('../middleware/authentication')

router.use(isAuthenticatedUser); //to apply verification to all the routes

router.post("/post", controller.postPurchaseProduct);
router.get("/get", controller.getPurchaseProduct);
router.get("/get/:id", controller.getPurchaseProductById);
router.put("/put/:id", controller.updatePurchaseProductById);
router.delete("/delete/:id", controller.deletePurchaseProductById);



router.get(
  "/getTotalPurcahseThisMonth",
  controller.getTotalPurchaseCurrentMonth
);
router.get(
  "/getTotalPurcahseThisMonth/:shop",
  controller.getTotalPurchaseCurrentMonthWithUser
);



//////************temp purchase routes *******/////////
router.post("/createTemporaryPurcahse", controller.createTempPurchase);
router.get("/getTemp", controller.getTemporaryPurchase);
router.get("/getTempPurchase/:id", controller.getTemporaryPurchaseDetails);
router.get("/getTemporaryPurchase/:id", controller.getTemporaryPurchaseRecord);
router.delete("/deleteFromPendings/:id", controller.deleteTempPurchasePendings);


router.delete(
  "/deleteTempPurchaseProduct/:id",
  controller.deleteTempPurchaseProduct
);
router.put("/updateTempPurchase/:id", controller.updateTempRecord);
router.delete(
  "/deletePurchaseTemp/:id",
  controller.DeleteAllTempPurchaseRecord
);
module.exports = router;
