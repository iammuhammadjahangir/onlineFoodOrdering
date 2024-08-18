const express = require("express");
const router = express.Router();

const controller = require("../controllers/customerController");

router.get("/get/:status", controller.getCustomer);
router.get("/get/:status/Names", controller.getCustomerNames);
router.post("/post", controller.postCustomer);
router.delete("/delete/:id/:status", controller.deleteCustomer);
router.put("/update/:id", controller.updateCustomer);
router.get("/get/:id", controller.getCustomerById);

module.exports = router;
