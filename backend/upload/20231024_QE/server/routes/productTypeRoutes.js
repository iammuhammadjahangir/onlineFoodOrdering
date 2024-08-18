const express = require("express");
const controller = require("../controllers/productTypeController");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const { isAuthenticatedUser } = require("../middleware/authentication");

router.use(isAuthenticatedUser); //to apply verification to all the routes

router.get("/get", controller.getProductType);
router.post("/post", controller.postProductType);
router.put("/put/:id", controller.updateProductTypeById);
router.delete("/delete/:id", controller.deleteProductTypeById);
router.get("/get/:id", controller.getProductTypeById);

//************************* Excel to MongoDb  *************************8/
router.post(
  "/postProductTypeExcelToMongoDB",
  controller.PostProductTypeFromExcel
);
router.post(
  "/updateProductTypeExcelToMongoDB",
  controller.updateProductTypeFromExcel
);

module.exports = router;
