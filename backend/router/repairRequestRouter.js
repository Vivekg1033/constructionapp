import express from "express";
import { isClientAuthenticated } from "../middlewares/auth.js";
import { addRepairRequest } from "../controller/repairRequestController.js";
const router = express.Router();

router.post("/client/send", isClientAuthenticated,addRepairRequest )

export default router;