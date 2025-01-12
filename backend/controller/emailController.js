import { transporter } from "../config/email.config.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

import { Admin_Welcome_Email_Template, Client_Verification_Email_Template, Client_Welcome_Email_Template, Technician_Welcome_Email_Template } from "../utils/templates.js";

export const sendClientVerificationOtp = catchAsyncErrors(async (req, res) => {
    const { email } = req.body;
    const { otp } = req; // Get OTP from the request object

    // Prepare email content
    const response = await transporter.sendMail({
        from: `"Construction" <${process.env.NODEMAILER_EMAIL}>`, // sender address
        to: email, // recipient's email
        subject: "Verify Your Email", // Subject line
        text: `Your OTP is: ${otp}`, // Plain text body
        html: Client_Verification_Email_Template.replace("{verificationCode}",otp), // HTML body
    });

    // console.log("Email Sent Successfully:", response);

    res.status(200).json({ message: "OTP sent successfully" }); // Optional: include OTP for testing

});

export const sendClientWelcomeEmail=catchAsyncErrors(async(email,name)=>{
    const response=   await transporter.sendMail({
        from: `"Construction" <${process.env.NODEMAILER_EMAIL}>`,

        to: email, // list of receivers
        subject: "Welcome Email", // Subject line
        text: "Welcome Email", // plain text body
        html: Client_Welcome_Email_Template.replace("{name}",name)
    })
    // console.log('Email send Successfully',response)
});

export const sendAdminTechnicianWelcomeEmail = catchAsyncErrors(async (email, name, role) => {
    // Determine email subject and template based on role
    const isAdmin = role === "admin";
    const subject = isAdmin ? "Welcome to the Admin Team" : "Welcome to the Technician Team";
    const template = isAdmin 
        ? Admin_Welcome_Email_Template.replace("{name}", name) 
        : Technician_Welcome_Email_Template.replace("{name}", name);

    // Send email
    const response = await transporter.sendMail({
        from: `"Construction" <${process.env.NODEMAILER_EMAIL}>`, // Sender address
        to: email, // Recipient's email address
        subject, // Subject line
        text: `Hello ${name},\n\n${isAdmin ? "Welcome to the Admin Team!" : "Welcome to the Technician Team!"}`, // Plain text body
        html: template, // HTML body with placeholders
    });

    // console.log(`Welcome Email Sent Successfully to ${role}:`, response);
});
