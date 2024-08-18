const express = require("express");
const controller = require("../controllers/companyController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/authentication");
const verifyJWT = require("../middleware/verifyJWT");

router.use(isAuthenticatedUser); //to apply verification to all the routes

router.post("/post", controller.postCompany);
router.get("/get", controller.getCompany);
router.put("/put/:id", controller.updateCompanyById);
router.delete("/delete/:id", controller.deleteCompanyById);
router.get("/get/:id", controller.getCompanyById);

//************************* Excel to MongoDb  *************************8/
router.post("/postCompanyExcelToMongoDB", controller.PostCompanyFromExcel);
router.post("/updateCompanyExcelToMongoDB", controller.updateCompanyFromExcel);

module.exports = router;
