import express from "express";

// Controllers Imports
import {
  loginUser,
  signupUser,
  logoutUser,
  deleteUser,
  profileData,
  updateProfile,
} from "../controllers/userControllers";

const router = express.Router();

// Public Routes
router.post("/login", loginUser);
router.post("/signup", signupUser);

// Private Routes
router.post("/logout", logoutUser);
router.post("/delete", deleteUser);
router
  .route("/profile")
  .get(profileData)
  .post(updateProfile);

export default router;
