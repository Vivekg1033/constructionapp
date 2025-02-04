import otpStore from "../utils/otpStore.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "./errorMiddleware.js";

export const generateOtp = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;

    console.log("hello1");

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already registered.", 400));
    }

    // Generate a 6-digit OTP and set expiration
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes

    // Store OTP in memory
    otpStore[email] = { otp, expiresAt };

    // Attach OTP to the request object for the next middleware
    req.otp = otp;

    // console.log(otp, otpStore);

    // Proceed to the next middleware
    next();
});