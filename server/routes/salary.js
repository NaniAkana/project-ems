import express from "express";
import AuthMiddleware from '../middleware/AuthMiddleware.js'
import { addSalary, getSalary } from "../controllers/SalaryController.js";

const router = express.Router()

router.post('/add',AuthMiddleware, addSalary)
router.get('/:id/:role',AuthMiddleware, getSalary)


export default router
