const express = require("express");
const controller = require("../controllers/transferProductController");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {isAuthenticatedUser} = require('../middleware/authentication')
 router.use(isAuthenticatedUser); //to apply verification to all the routes

router.get("/get", controller.getTransferProduct);
router.get("/get/:id", controller.getTransferProductById);
// router.post("/postTemp", controller.postTempTransfer);
router.post("/post", controller.postTransferProduct);

/////************** Temp Tansfer Routes */
router.post("/createTemporaryTransfer", controller.createTempTransfer);
router.get("/getTemp", controller.getTemporaryTransfer);
router.get("/getTempTransfer/:id", controller.getTemporaryTransferDetails);
router.delete("/deleteFromTransferPendings/:id", controller.deleteTempTransferPendings);
router.put("/updateTempTransferProductQuantity/:quantityidset/:colorId/:locationsetid", controller.updateTempTransferProductQuantityy);
router.put("/updateTempTransfer/:id", controller.updateTempRecord);
router.get("/getProductLocationOnGodownAndProductId/:productId/:colorId/:godownAvalibilityId", controller.getProductLocationOnGodownAndProductId)
router.delete(
  "/deleteTempTransferProduct/:id1/:id2",
  controller.deleteTempTransferProduct
);

router.delete("/deleteTemp", controller.DeleteAllTempRecord);
router.delete("/delete/:id", controller.deleteTemporaryTransferById);

router.get("/getInvoiceRecordOnStorageCode/:id", controller.getInvoiceRocordOnStorageCode);
module.exports = router;
