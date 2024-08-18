const express = require("express");
const controller = require("../controllers/productAndColorTableController");
const router = express.Router();
// const {isAuthenticatedUser} = require('../middleware/authentication')
// const verifyJWT = require("../middleware/verifyJWT");

router.use("/postProductAndColor", controller.postProductAndColor)
router.use("/getProductAndColor", controller.getProductAndColor)
module.exports = router;