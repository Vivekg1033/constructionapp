import express from "express";
import { generateOtp } from "../middlewares/generateOtp.js";
import { sendClientVerificationOtp } from "../controller/emailController.js";
import { clientRegister, getUserDetails, login, clientLogout, addAdminTechnician, adminLogout, technicianLogout } from "../controller/userController.js";
import { isAdminAuthenticated, isClientAuthenticated, isTechnicianAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login)

router.post("/client/register/otp", generateOtp, sendClientVerificationOtp);
router.post("/client/register", clientRegister);
router.get("/client/me", isClientAuthenticated, getUserDetails);
router.get("/client/logout", isClientAuthenticated, clientLogout);

router.post('/admin/add', isAdminAuthenticated, addAdminTechnician);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, adminLogout);

router.get("/technician/me", isTechnicianAuthenticated, getUserDetails);
router.get("/technician/logout", isTechnicianAuthenticated, technicianLogout);

export default router;