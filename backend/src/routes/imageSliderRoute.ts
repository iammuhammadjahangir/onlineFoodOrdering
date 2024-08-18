import express from "express";
import {
  AddSliderImages,
  deleteSliderImage,
  getAllSliderImages,
} from "../controllers/imageSliderController.js";
import { multiUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/post", multiUpload, AddSliderImages);
router.get("/get", getAllSliderImages);
router.delete("/delete/:id", deleteSliderImage);

export default router;
