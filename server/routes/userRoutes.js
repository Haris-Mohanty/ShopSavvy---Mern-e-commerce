import express from "express";
import {
  loginUser,
  registerUser,
  getUserDetailsController,
  logoutController,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

// Router Obj
const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get user details
router.get("/user-details", authMiddleware, getUserDetailsController);

// Logout user
router.get("/logout", authMiddleware, logoutController);

//Export
export default router;
