const express = require("express");
const controller = require("../controllers/godownController");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {isAuthenticatedUser} = require('../middleware/authentication')
router.use(isAuthenticatedUser); //to apply verification to all the routes

router.get("/get", controller.getGodown);
router.post("/post", controller.postGodown);
router.put("/put/:id", controller.updateGodownById);
router.delete("/delete/:id", controller.deleteGodownById);
router.get("/get/:id", controller.getGodownById);

module.exports = router;
