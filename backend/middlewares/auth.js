import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isClientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.clientToken;

    console.log(req.cookies)

    if(!token) {
        return next(new ErrorHandler("User not Authenticated", 400))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);;
    
    if (req.user.role !== "client") {
        return next(new ErrorHandler(`${req.user.role} is not authorized for this resource.`, 403));
    }

    next(); 
})

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;

    if(!token) {
        return next(new ErrorHandler("User not Authenticated", 400))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);;
    
    if (req.user.role !== "admin") {
        return next(new ErrorHandler(`${req.user.role} is not authorized for this resource.`, 403));
    }

    next(); 
})

export const isTechnicianAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.technicianToken;

    if(!token) {
        return next(new ErrorHandler("User not Authenticated", 400))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);;
    
    if (req.user.role !== "technician") {
        return next(new ErrorHandler(`${req.user.role} is not authorized for this resource.`, 403));
    }

    next(); 
})