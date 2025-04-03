import express from "express";
import { getAllUsers } from "../controllers/usersController"; // Pastikan impor fungsi spesifik

const router = express.Router();

// Define the route to get all users
router.get("/", getAllUsers); // Gunakan fungsi getAllUsers secara langsung

export default router;
