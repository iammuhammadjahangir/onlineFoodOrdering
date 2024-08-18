import express from "express";
import {
  deleteCategoryById,
  getAllCategories,
  getAllForCustomers,
  getCategoryById,
  newCategory,
  updateCategoryById,
} from "../controllers/categoryController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/post", upload.single("photo"), newCategory); //Admin
router.get("/all", getAllCategories); //Admin
router.get("/getAllForCustomer", getAllForCustomers); //Customer
router
  .route("/:categoryId")
  .get(getCategoryById)
  .put(upload.single("photo"), updateCategoryById)
  .delete(deleteCategoryById); //Admin

export default router;
