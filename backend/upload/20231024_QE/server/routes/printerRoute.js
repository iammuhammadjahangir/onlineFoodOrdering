const express = require("express");
const controller = require("../controllers/printerControllers");
const { isAuthenticatedUser } = require("../middleware/authentication");
const router = express.Router();
//  router.use(isAuthenticatedUser); //to apply verification to all the routes
// router.route("/get").get(isAuthenticatedUser, controller.getColor)

router.post("/postPrinter", controller.postPrinter);
router.get("/getPrinter", controller.getAllPrinters);
router.get("/getSinglePrinter/:id", controller.getSinglePrinters);
router.put("/putPrinter/:id", controller.updatePrinterStatus);
module.exports = router;        
