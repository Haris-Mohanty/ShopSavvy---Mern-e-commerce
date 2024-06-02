import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadProductController } from "../controllers/productController.js";

//Router Obj
const router = express.Router();

//***** Create Routes *****/
//Upload Product
router.post("/upload-product", authMiddleware, uploadProductController);

//Export
export default router;
