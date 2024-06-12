import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addToCartController } from "../controllers/cartItemController.js";

// Rourer obj
const router = express.Router();

//********* Create Routes ********/
router.post("/add-to-cart", authMiddleware, addToCartController);

// Export
export default router;
