const express = require("express");
const controller = require("../controllers/productLocationController");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {isAuthenticatedUser} = require('../middleware/authentication')
router.use(isAuthenticatedUser); //to apply verification to all the routes

router.post("/post", controller.postProductLocation);
router.get("/get", controller.getProductLocation);
router.get("/getForShop/:id", controller.getProductLocationForShop)
router.get('/getForGodown/:id', controller.getProductLocationForGodown)
router.post("/updateAndPostProduct", controller.updateProductByProductAndLocation);
router.put("/updateProductLocOnSale", controller.updateLocationOnSale);
router.put("/updateProductLocOnGodownIdUsingTransfer", controller.updateLocationOnGodownInTransfer);
router.get("/getId/:id", controller.getProductLocationById);
router.get("/getProductLocationOnShopType", controller.getProductLocationOnShopType);
router.get("/getProductLocationOnGodownType", controller.getProductLocationOnGodownType);


router.put("/putId/:id", controller.updateProductLocationById);
router.delete("/delete/:id", controller.deleteLocationById);
router.put(
  "/updateQuantity/:quantityidset/:locationsetid",
  controller.updateTempTransferProductQuantityy
);
router.put("/updateQuantities", controller.updateMultipleQuantities);
router.put("/putProductId/:id", controller.updateProductLocationByProduct);

router.get("/getProductId/:id", controller.getProductLocationByProduct);
router.get(
  "/getProductIdForTransferProduct/:id1/:id2",
  controller.getProductLocationByProductAndLocation
);

router.put(
  "/putToUpdateQuantity/:id",
  controller.updateProductLocationQuantityById
);
router.get(
  "/getProductForStorageCode/:id",
  controller.getShopRocordOnStorageCode
);
module.exports = router;
