import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  uploadProductController,
  getAllProductsController,
} from "../controllers/productController.js";

//Router Obj
const router = express.Router();

//***** Create Routes *****/
//Upload Product
router.post("/upload-product", authMiddleware, uploadProductController);

// Get all product
router.get("/get-all-products", getAllProductsController);

//Export
export default router;
