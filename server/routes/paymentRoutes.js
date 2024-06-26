import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createPaymentController,
  verifyPaymentController,
  getMyOrdersController,
  cancelOrderController,
  updateOrderPaymentController,
} from "../controllers/paymentController.js";

// Create router obj
const router = express.Router();

// Create routes || Place Order
router.post("/create-payment", authMiddleware, createPaymentController);

//Verify payment
router.post("/verify-payment", authMiddleware, verifyPaymentController);

// Get Order details || My orders
router.get("/get-my-orders", authMiddleware, getMyOrdersController);

// Cancel Order
router.put("/cancel-order", authMiddleware, cancelOrderController);

// Update order payment
router.post("/update-payment", authMiddleware, updateOrderPaymentController);

// Export router
export default router;
