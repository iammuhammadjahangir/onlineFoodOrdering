import express from "express";
import {
  deleteUser,
  forgetPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
} from "../controllers/userController.js";
import { singleUpload } from "../middleware/multer.js";
import {
  authorizeRole,
  isAuthenticated,
} from "../middleware/authenticateJwt.js";

const router = express.Router();

// router.get("/all",)
router.post("/register", singleUpload, registerUser); //done
router.post("/login", loginUser); //Done
router.get("/logout", isAuthenticated, logoutUser); //Done
router.post("/password/forgot", forgetPassword); //Done
router.put("/password/reset/:token", resetPassword); //Done
router.get("/me", isAuthenticated, getUserDetails); //no need
router.put("/password/update", isAuthenticated, updatePassword); //Done
router.put("/me/update", isAuthenticated, singleUpload, updateProfile); //Done
router.get("/refreshToken", refreshToken); //Done
router.get(
  "/admin/users",
  isAuthenticated,
  // authorizeRole("Admin"),
  getAllUsers
); //Done
router
  .route("/admin/user/:id")
  .get(isAuthenticated, getSingleUser)
  .put(isAuthenticated, singleUpload, updateUserRole) //Done
  .delete(isAuthenticated, deleteUser); //Done
// .get(isAuthenticated, authorizeRole("admin"), getSingleUser)
// .put(isAuthenticated, authorizeRole("admin"), singleUpload, updateUserRole)
// .delete(isAuthenticated, authorizeRole("admin"), deleteUser);

export default router;
