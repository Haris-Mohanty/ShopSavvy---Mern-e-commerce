import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createAddressController } from "../controllers/addressController.js";

// Create router obj
const router = express.Router();

// Routes create || Create Address
router.post("/create-address", authMiddleware, createAddressController);

//Export
export default router;
