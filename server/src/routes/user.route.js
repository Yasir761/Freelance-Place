import { Router } from "express";
import {
  signup,
  login,
  logout,
  getUserById,
  updateUser,
  uploadProfile,
  changePassword,
  deleteUser,
  generateUserProfileByName,
  regenerateTokens,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js"
import { Upload } from "../middleware/multer.js";

export const userRoutes = Router();

// public routes
userRoutes.route("/signup").post(signup);
userRoutes.route("/login").post(login);
userRoutes.route("/profileImage?").get(generateUserProfileByName);
userRoutes.route("/regenrate-tokens").post(regenerateTokens);

// private routes
userRoutes.route("/logout").get(verifyToken, logout);
userRoutes.route("/change-password").post(verifyToken, changePassword);
userRoutes.route("/update-profile").post(verifyToken, Upload.single("profile"), uploadProfile);
userRoutes.route("/:id")
.get( getUserById )
.patch(verifyToken, updateUser)
.delete(verifyToken, deleteUser);
