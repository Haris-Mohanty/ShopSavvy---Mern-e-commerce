import express from "express";
import {
  loginUser,
  registerUser,
  getUserDetailsController,
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

//Export
export default router;
