import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  uploadProductController,
  getAllProductsController,
  updateProductController,
  getProductCategoryController,
  getCategoryWiseProductController,
  getProductDetailsController,
  searchProductController,
  filterProductController,
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

// Get category wise product
router.get("/get-category-wise-product", getCategoryWiseProductController);

// Get product details by id
router.get("/get-product-details/:id", getProductDetailsController);

// Search Produts (By Name and Category)
router.get("/search-product", searchProductController);

// Filter Products
router.get("/filter-product", filterProductController);

//Export
export default router;
