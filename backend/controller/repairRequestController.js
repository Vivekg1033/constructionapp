import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { RepairRequest } from "../models/RepairRequestSchema.js"; 
import { User } from "../models/userSchema.js"; 

export const addRepairRequest = catchAsyncErrors(async (req, res) => {
    const { description, purpose, clientNotes } = req.body;

    if (!req.user || req.user.role !== "client") {
        return res.status(403).json({
            success: false,
            message: "Only clients can create repair requests."
        });
    }

    if (!description || description.length < 10) {
        return res.status(400).json({
            success: false,
            message: "Description is required and must be at least 10 characters long."
        });
    }

    if (!purpose || !["appliance-repair", "electrical-work", "plumbing", "carpentry", "general-maintenance"].includes(purpose)) {
        return res.status(400).json({
            success: false,
            message: "Purpose is required and must be one of the valid categories."
        });
    }

    const repairRequest = new RepairRequest({
        client: req.user._id,
        description,
        purpose,
        attachments: req.imageUrls || [], // Store multiple Cloudinary URLs
        clientNotes: clientNotes || "",
        status: "initiated",
    });

    await repairRequest.save();

    return res.status(201).json({
        success: true,
        message: "Repair request created successfully.",
        repairRequest
    });
});
