import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllUserController,
  updateUserController,
} from "../controllers/adminController.js";

// Router Obj
const router = express.Router();

// Get all user
router.get("/get-all-users", authMiddleware, getAllUserController);

// Update user
router.put("/update-user/:id", authMiddleware, updateUserController);

//Export
export default router;
