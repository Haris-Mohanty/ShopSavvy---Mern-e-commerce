import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

// Router Obj
const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

//Export
export default router;
