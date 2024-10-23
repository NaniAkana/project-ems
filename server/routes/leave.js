import express from "express";
import AuthMiddleware from '../middleware/AuthMiddleware.js'
import { addLeave, getLeaves, updateLeave, getLeave, getLeaveDetail } from "../controllers/LeaveController.js";
const router = express.Router()

router.post('/add',AuthMiddleware, addLeave)
router.get('/:id',AuthMiddleware, getLeave)
router.get('/detail/:id', AuthMiddleware, getLeaveDetail)
router.get('/',AuthMiddleware,getLeaves)
router.get('/:id',AuthMiddleware,updateLeave)


export default router
