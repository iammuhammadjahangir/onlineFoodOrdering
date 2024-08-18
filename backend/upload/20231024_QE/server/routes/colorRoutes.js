const express = require("express");
const controller = require("../controllers/colorController");
const { isAuthenticatedUser } = require("../middleware/authentication");
const router = express.Router();
// const verifyJWT = require("../middleware/verifyJWT");
router.use(isAuthenticatedUser); //to apply verification to all the routes
// router.route("/get").get(isAuthenticatedUser, controller.getColor)
router.get("/get", controller.getColor);
router.post("/post", controller.postColor);
router.put("/put/:id", controller.updateColorById);
router.delete("/delete/:id", controller.deleteColorById);
router.get("/get/:id", controller.getColorById);

//************************* Excel to MongoDb  *************************8/
router.post("/postColorsExcelToMongoDB", controller.PostColorsFromExcel);
router.post("/updateColorsExcelToMongoDB", controller.updateColorsFromExcel);
module.exports = router;
