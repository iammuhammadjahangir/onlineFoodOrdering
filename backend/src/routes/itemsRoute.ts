import express from "express";
// import {
//   deleteItem,
//   getAllItems,
//   getAllItemsForAdmin,
//   getItemById,
//   getSearchedItems,
//   newItem,
//   updateItemById,
// } from "../controllers/itemsController.js";
import { singleUpload, upload } from "../middleware/multer.js";
import {
  deleteAdditionalImageByIndex,
  deleteItem,
  getAllItemsForAdmin,
  newItem,
  updateItemById,
} from "../controllers/itemsController.js";

const router = express.Router();

router.post(
  "/post",
  upload.fields([{ name: "photo" }, { name: "additionalImages" }]),
  newItem
);
router.get("/admin/all", getAllItemsForAdmin);
router.delete("/admin/images/:ItemsId", deleteAdditionalImageByIndex);
// router.get("/all", getAllItems);
// router.get("/search", getSearchedItems);
router
  .route("/:ItemsId")
  .put(
    upload.fields([{ name: "photo" }, { name: "additionalImages" }]),
    updateItemById
  )
  .delete(deleteItem);
//   .get(getItemById)

export default router;
