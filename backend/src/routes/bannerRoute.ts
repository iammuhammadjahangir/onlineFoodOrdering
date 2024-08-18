import express from "express";
import {
  deleteBanner,
  getAllBanners,
  getAllBannersForClient,
  getBannerById,
  newBanner,
  updateBanner,
  updateBannerStatus,
} from "../controllers/bannerController.js";
import {
  singleUpload,
  singleUploadWithOutBuffer,
  upload,
} from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/new",
  upload.fields([{ name: "appBannerImage" }, { name: "webBannerImage" }]),
  newBanner
);
router.get("/all", getAllBanners);

router.get("/client/banners", getAllBannersForClient); //for client with all restricction for time and status
router.put("/status/:id", updateBannerStatus);
router
  .route("/:id")
  .get(getBannerById)
  .put(
    upload.fields([{ name: "appBannerImage" }, { name: "webBannerImage" }]),
    updateBanner
  )
  .delete(deleteBanner);

export default router;
