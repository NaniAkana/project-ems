import express from "express";
import authMiddleware from '../middleware/AuthMiddleware.js'; // Ensure this middleware works properly
import { getSummary } from "../controllers/DashboardController.js";

const router = express.Router();

router.get('/summary',authMiddleware, getSummary);

export default router;
