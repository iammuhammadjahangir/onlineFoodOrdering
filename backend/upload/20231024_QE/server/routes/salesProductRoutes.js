const express = require("express");
const controller = require("../controllers/saleProductController");
// const { auth, authAdmin } = require("../middleware/auth");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {isAuthenticatedUser} = require('../middleware/authentication')
router.use(isAuthenticatedUser); //to apply verification to all the routes

router.post("/post", controller.postSaleProduct);
router.get("/get", controller.getSaleProduct);
router.get("/get/:id", controller.getSaleProductById);
router.get("/getproductLocc/:id", controller.getSaleProductByIdproductLocc);
router.put("/put/:id", controller.updateSaleProductById);
router.put("/putproductLoc/:id", controller.updateSaleProductByIdproductLoc);
router.put("/putproductLocc/:id", controller.updateSaleProductByIdproductLocc);
router.delete("/delete/:id", controller.deleteSaleProductById);
router.get("/gets", controller.getTopProducts);
router.get("/gets/:shop", controller.getTopProductswithShop);
router.get("/getTotalSaleThisMonth", controller.getTotalSaleCurrentMonth);
router.get(
  "/getTotalSaleThisMonth/:shop",
  controller.getTotalSaleCurrentMonthwithShop
);

//////************temp sales routes *******/////////
router.post("/createTemporarySales", controller.createTempSales);
router.get("/getTempSale/:id", controller.getTemporarySaleDetails);
router.get("/getTempSalePending/:id", controller.getTemporarySaleRecord);
router.get("/getTemp", controller.getTemporarySale);
router.get("/getProductLocationOnShopAndProductId/:productId/:colorId/:shopAvalibilityId", controller.getProductLocationOnShopAndProductId)
router.delete("/deleteFromPendings/:id", controller.deleteTempSalePendings);
router.put("/updateTempSaleProductQuantity/:quantityidset/:locationsetid", controller.updateTempSaleProductQuantityy);

router.put("/updateTempSales/:id", controller.updateTempRecord);

router.delete("/deleteTemp/:id", controller.DeleteAllTempRecord);
router.delete("/deleteTempSaleProduct/:id", controller.deleteTempSaleProduct);
module.exports = router;
