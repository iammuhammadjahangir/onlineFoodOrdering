const express = require("express");
const controller = require("../controllers/employeeCommissionController");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const { isAuthenticatedUser } = require("../middleware/authentication");

router.use(isAuthenticatedUser);
router.post("/post", controller.postEmployeeCommission);
router.get("/get", controller.getCommissionRecord);
router.get("/getPaid/:id", controller.getCommissionByID);

module.exports = router;
