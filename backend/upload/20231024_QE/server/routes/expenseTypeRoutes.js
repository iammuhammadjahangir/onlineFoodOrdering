const express = require("express");
const controller = require("../controllers/expenseTypeController");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {isAuthenticatedUser} = require('../middleware/authentication')

router.use(isAuthenticatedUser); //to apply verification to all the routes

router.post("/post", controller.postExpenseType);
router.get("/get", controller.getExpenseType);
router.get("/get/:id", controller.getExpenseTypeById);
router.put("/put/:id", controller.updateExpenseType);
router.delete("/delete/:id", controller.deleteExpenseType);

module.exports = router;
