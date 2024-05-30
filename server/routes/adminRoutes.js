import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllUserController } from "../controllers/adminController.js";

// Router Obj
const router = express.Router();

// Get all user
router.get("/get-all-users", authMiddleware, getAllUserController);

//Export
export default router;
