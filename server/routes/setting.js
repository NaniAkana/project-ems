import express from "express";
import AuthMiddleware from '../middleware/AuthMiddleware.js'
import { changePassword } from "../controllers/SettingController.js";

const router = express.Router()

router.put('/change-password',AuthMiddleware, changePassword)


export default router
