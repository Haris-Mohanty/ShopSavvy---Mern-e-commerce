import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createAddressController,
  getAddressOfUserController,
  updateAddressController,
} from "../controllers/addressController.js";

// Create router obj
const router = express.Router();

// Routes create || Create Address
router.post("/create-address", authMiddleware, createAddressController);

// Get Address of user
router.get("/get-address", authMiddleware, getAddressOfUserController);

// Update address
router.put("/update-address", authMiddleware, updateAddressController);

//Export
export default router;
