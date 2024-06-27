import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllUserController,
  updateUserController,
  deleteUserController,
  getAllOrdersController,
  updateOrderStatusController,
} from "../controllers/adminController.js";

// Router Obj
const router = express.Router();

// Get all user
router.get("/get-all-users", authMiddleware, getAllUserController);

// Update user
router.put("/update-user/:id", authMiddleware, updateUserController);

// Delete user
router.delete("/delete-user/:id", authMiddleware, deleteUserController);

// Get all orders
router.get("/get-all-orders", authMiddleware, getAllOrdersController);

// Update Order status
router.put("/update-status", authMiddleware, updateOrderStatusController);

//Export
export default router;
