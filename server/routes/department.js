import express from "express";
import AuthMiddleware from '../middleware/AuthMiddleware.js'
import { addDepartment, getDepartments,getDepartment, updateDepartment, deleteDepartment } from "../controllers/DepartmentController.js";

const router = express.Router()

router.post('/add',AuthMiddleware, addDepartment)
router.get('/',AuthMiddleware, getDepartments)
router.get('/:id',AuthMiddleware, getDepartment)
router.put('/:id',AuthMiddleware, updateDepartment)
router.delete('/:id',AuthMiddleware, deleteDepartment)

export default router
