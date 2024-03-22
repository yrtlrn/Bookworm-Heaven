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

// Validators Imports
import {
  loginValidator,
  signupValidator,
  updateProfileValidator,
} from "../middlewares/validators/userValidators";
import { authorizedCheck } from "../middlewares/authorizedCheck";

const router = express.Router();

// Public Routes
router.post("/login", loginValidator, loginUser);
router.post("/signup", signupValidator, signupUser);

// Private Routes
router.post("/logout", authorizedCheck, logoutUser);
router.delete("/delete", deleteUser);
router
  .route("/profile")
  .get(authorizedCheck, profileData)
  .put(
    authorizedCheck,
    updateProfileValidator,
    updateProfile
  );

export default router;
