import express from "express";
import {
  createWareHouse,
  deleteWareHouse,
  getAllWareHouse,
  getWareHouseById,
  updateWareHouse,
} from "../controllers/warehouseController.js";

const router = express.Router();

router.post("/new", createWareHouse);
router.get("/getAll", getAllWareHouse);
router.put("/update/:id", updateWareHouse);
router.delete("/delete/:id", deleteWareHouse);
router.get("/get/:id", getWareHouseById);

export default router;
