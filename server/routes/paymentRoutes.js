import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createPaymentController } from "../controllers/paymentController.js";

// Create router obj
const router = express.Router();

// Create routes
router.post("/create-payment", authMiddleware, createPaymentController);

// Export router
export default router;
