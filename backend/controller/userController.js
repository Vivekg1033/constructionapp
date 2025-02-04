import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { generateToken } from "../utils/jwtToken.js";
import otpStore from "../utils/otpStore.js";
import { sendAdminTechnicianWelcomeEmail, sendClientWelcomeEmail } from "./emailController.js";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const clientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, password, address, otp } = req.body;

    const role = "client";

    // Validate input fields
    if (!firstName || !lastName || !email || !password || !role || !otp) {
        return next(new ErrorHandler("Please fill the complete form.", 400));
    }

    // Verify OTP
    const storedData = otpStore[email];
    if (!storedData) {
        return next(new ErrorHandler("OTP not found or already used.", 400));
    }

    if (storedData.otp !== otp) {
        return next(new ErrorHandler("Invalid OTP.", 400));
    }

    if (Date.now() > storedData.expiresAt) {
        return next(new ErrorHandler("OTP has expired.", 400));
    }

    // Check if user already exists
    let user1 = await User.findOne({ email });
    if (user1) {
        return next(new ErrorHandler("User already registered.", 400));
    }

    // Create new user
    user1 = await User.create({
        firstName,
        lastName,
        email,
        password,
        role,
        address,
    });

    // Clear OTP after successful registration
    delete otpStore[email];

    sendClientWelcomeEmail(email, firstName);

    // Generate and send token
    generateToken(user1, "User registered successfully.", 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const {
        email,
        password,
        role
    } = req.body;

    if (!email || !password || !role) {
        return next(new ErrorHandler("Please provide all details.", 400))
    }

    const user = await User.findOne({
        email
    }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password.", 400))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password.", 400))
    }

    // console.log(role, user.role)

    if (role !== user.role) {
        return next(new ErrorHandler("Trying to access with invalid credantials.", 400))
    }

    generateToken(user, "User Logged In Successfully.", 200, res);
})

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    })
})

export const clientLogout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("clientToken", {
        httpOnly: true, 
    });

    res.status(200).json({
        success: true,
        message: "User logged out successfully.",
    });
})

export const addAdminTechnician = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, role, email, password, address } = req.body;

    if (!firstName || !lastName || !email || !password || !role ) {
        return next(new ErrorHandler("Please fill full form.", 400))
    }

    if (role === "technician" && !address ) {
        return next(new ErrorHandler("Please fill full form.", 400))
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler('User with this email already exists.', 400));
    }

    // Create the new employee
    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        role,
        address
    });

    // Send welcome email to the new admin
    sendAdminTechnicianWelcomeEmail(email, `${firstName} ${lastName}`, role);

    res.status(201).json({
        success: true,
        message: `${capitalize(role)} Added successfully.`,
        newUser
    })
});

export const adminLogout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("adminToken", {
        httpOnly: true, 
    });

    res.status(200).json({
        success: true,
        message: "User logged out successfully.",
    });
})

export const technicianLogout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("technicianToken", {
        httpOnly: true, 
    });

    res.status(200).json({
        success: true,
        message: "User logged out successfully.",
    });
})

