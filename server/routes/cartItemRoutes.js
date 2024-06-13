import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  addToCartController,
  countCartItemsController,
} from "../controllers/cartItemController.js";

// Rourer obj
const router = express.Router();

//********* Create Routes ********/

//Add to cart
router.post("/add-to-cart", authMiddleware, addToCartController);

//Count cart items
router.get("/count-cart-items", authMiddleware, countCartItemsController);

// Export
export default router;
