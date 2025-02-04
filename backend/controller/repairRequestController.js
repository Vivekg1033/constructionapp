import { RepairRequest } from "../models/RepairRequestSchema.js"; // Import the RepairRequest mo
import { User } from "../models/userSchema.js"; // Import the User model for validation if needed

/**
 * @desc Add a new repair request
 * @route POST /api/repair-requests
 * @access Client (Authenticated)
 */
export const addRepairRequest = async (req, res) => {
    try {
        // Extract client input from the request body
        const { description, purpose, attachments, clientNotes } = req.body;

        // Validate the authenticated user (assumes req.user contains the logged-in user info)
        if (!req.user || req.user.role !== "client") {
            return res.status(403).json({
                success: false,
                message: "Only clients can create repair requests."
            });
        }

        // Check required fields
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

        // Create the repair request
        const repairRequest = new RepairRequest({
            client: req.user._id, // ID of the authenticated client
            description,
            purpose,
            attachments: attachments || [], // Optional field for image URLs or documents
            clientNotes: clientNotes || "", // Optional field for additional client input
            status: "initiated", // Default status
            // statusHistory: [
            //     {
            //         status: "initiated",
            //         updatedBy: req.user._id, // The client initiating the request
            //         comments: "Request created by the client."
            //     }
            // ]
        });

        // Save the repair request to the database
        await repairRequest.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: "Repair request created successfully.",
            repairRequest
        });
    } catch (error) {
        // Handle server errors
        console.error("Error creating repair request:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the repair request.",
            error: error.message
        });
    }
};
