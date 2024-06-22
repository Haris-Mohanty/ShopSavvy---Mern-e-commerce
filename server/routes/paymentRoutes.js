import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createPaymentController,
  verifyPaymentController,
} from "../controllers/paymentController.js";

// Create router obj
const router = express.Router();

// Create routes
router.post("/create-payment", authMiddleware, createPaymentController);

//Verify payment
router.post("/verify-payment", authMiddleware, verifyPaymentController);

// Export router
export default router;
