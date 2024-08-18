const express = require("express");
const controller = require("../controllers/productController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/authentication");
const verifyJWT = require("../middleware/verifyJWT");

router.use(isAuthenticatedUser); //to apply verification to all the routes

router.get("/get", controller.getProduct);
router.post("/post", controller.postProduct);
router.put("/putt/:id", controller.updateProductById);
router.delete("/delete/:id", controller.DeleteProductById);
router.get("/get/:id", controller.getProductById);
router.get("/barcode/:id", controller.getProductByBarcode);
router.get("/getProductOnCompanyName/:id", controller.getProductOnCompanyName);

//************************* Excel to MongoDb  */
router.post("/postExcelToMongoDB", controller.PostProductsFromExcel);
router.post("/updateExcelToMongoDB", controller.updateProductsFromExcel);
module.exports = router;
