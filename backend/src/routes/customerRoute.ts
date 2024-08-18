import express from "express";
import {
  allCustomer,
  checkoutCustomer,
  getCustomer,
  newCustomer,
  updateCustomer,
} from "../controllers/customerController.js";
import { singleUpload } from "../middleware/multer.js";
// import { getAllHomeData } from "../controllers/customerHomeController.js";

const router = express.Router();

router.post("/new", newCustomer);
router.get("/all", allCustomer);
router.post("/checkout", checkoutCustomer);
// router.get("/home", getAllHomeData);
router.route("/:id").get(getCustomer).put(singleUpload, updateCustomer);

export default router;
