import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  addToCartController,
  countCartItemsController,
  getCartItemsController,
  updateCartItemsController,
} from "../controllers/cartItemController.js";

// Rourer obj
const router = express.Router();

//********* Create Routes ********/

//Add to cart
router.post("/add-to-cart", authMiddleware, addToCartController);

//Count cart items
router.get("/count-cart-items", authMiddleware, countCartItemsController);

// Get Cart Items
router.get("/get-cart-items", authMiddleware, getCartItemsController);

// Update cart item (Increase, Decrease)
router.put("/update-cart-items", authMiddleware, updateCartItemsController);

// Export
export default router;
