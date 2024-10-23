import express from "express";
import AuthMiddleware from '../middleware/AuthMiddleware.js'
import { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId} from "../controllers/EmployeeController.js";

const router = express.Router()

router.post('/add',AuthMiddleware,upload.single('image'), addEmployee)
router.get('/',AuthMiddleware, getEmployees)
router.get('/:id',AuthMiddleware, getEmployee)
router.put('/:id',AuthMiddleware, updateEmployee)
router.get('/department/:id',AuthMiddleware, fetchEmployeesByDepId)

export default router
