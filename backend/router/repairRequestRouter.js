import express from "express";
import { isClientAuthenticated } from "../middlewares/auth.js";
import { addRepairRequest } from "../controller/repairRequestController.js";
import { uploadImagesMiddleware } from "../middlewares/uploadImage.js";
import { recentSameRequest } from "../middlewares/request.js";
const router = express.Router();

router.post("/client/send", isClientAuthenticated, recentSameRequest, uploadImagesMiddleware, addRepairRequest )

export default router;