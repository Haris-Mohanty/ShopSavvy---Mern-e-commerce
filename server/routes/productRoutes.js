import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  uploadProductController,
  getAllProductsController,
  updateProductController,
  getProductCategoryController,
} from "../controllers/productController.js";

//Router Obj
const router = express.Router();

//***** Create Routes *****/
//Upload Product
router.post("/upload-product", authMiddleware, uploadProductController);

// Get all product
router.get("/get-all-products", getAllProductsController);

// Update Product details
router.put("/update-product/:id", authMiddleware, updateProductController);

// Get Product Category
router.get("/get-product-category", getProductCategoryController);

//Export
export default router;
