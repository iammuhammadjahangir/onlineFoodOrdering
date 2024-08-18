const express = require("express");
const controller = require("../controllers/tableSettingController");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {isAuthenticatedUser} = require('../middleware/authentication')
router.use(isAuthenticatedUser); //to apply verification to all the routes

router.get("/getTableRowsRecord", controller.getAllTableRows);
router.post("/post", controller.postTable);
router.get("/getSingleTableRows/:id", controller.getSingleTableRows)
// router.put("/put/:id", controller.updateGodownById);
// router.delete("/delete/:id", controller.deleteGodownById);
// router.get("/get/:id", controller.getGodownById);

module.exports = router;
