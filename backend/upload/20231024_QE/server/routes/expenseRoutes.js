const express = require("express");
const controller = require("../controllers/expenseController");
const router = express.Router();
const {isAuthenticatedUser} = require('../middleware/authentication')
const verifyJWT = require("../middleware/verifyJWT");

router.use(isAuthenticatedUser); //to apply verification to all the routes

router.post("/post", controller.postExpense);
router.get("/get", controller.getExpense);
router.get("/get/:id", controller.getExpenseById);
router.get("/getTotalExpenseThisMonth", controller.getTotalExpenseThisMonth);
router.get(
  "/getTotalExpenseThisMonth/:shop",
  controller.getTotalExpenseThisMonthWithShop
);

module.exports = router;
