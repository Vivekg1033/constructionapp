import mongoose from "mongoose";

// Sub-schema for status history
const statusHistorySchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: [
            "initiated",
            "assigned",
            "in-progress",
            "pending-client-confirmation",
            "final-assignment",
            "repair-in-progress",
            "repair-completed",
            "cancelled"
        ]
    },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Admin/Technician/Client
    comments: { type: String, required: false }, // Additional notes during status updates
});

// Sub-schema for technician history
const technicianHistorySchema = new mongoose.Schema({
    technicianId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignmentDate: { type: Date, default: Date.now },
    role: { type: String, enum: ["price-negotiation", "final-repair"], required: true },
    notes: { type: String, required: false }, // Optional notes about the assignment
});

// Main RepairRequest Schema
const repairRequestSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    initiationDateTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: [10, "Description must contain at least 10 characters."],
        maxLength: [500, "Description cannot exceed 500 characters."],
        description: "Detailed description of the repair issue or request."
    },
    purpose: {
        type: String,
        required: true,
        enum: ["appliance-repair", "electrical-work", "plumbing", "carpentry", "general-maintenance"],
        description: "The purpose or category of the repair request."
    },
    status: {
        type: String,
        enum: [
            "initiated",
            "assigned",
            "in-progress",
            "pending-client-confirmation",
            "final-assignment",
            "repair-in-progress",
            "repair-completed",
            "cancelled"
        ],
        default: "initiated",
        required: true
    },
    repairPrice: {
        type: Number,
        required: function () {
            return this.status === "repair-completed";
        }
    },
    assignedAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: function () {
            return ["assigned", "final-assignment", "repair-in-progress", "repair-completed"].includes(this.status);
        }
    },
    technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: function () {
            return ["assigned", "final-assignment", "repair-in-progress", "repair-completed"].includes(this.status);
        }
    },
    assignmentDateTime: {
        type: Date,
        required: function () {
            return ["assigned", "final-assignment"].includes(this.status);
        }
    },
    scheduledVisitDate: {
        type: Date,
        required: function () {
            return ["assigned", "final-assignment"].includes(this.status);
        }
    },
    visitDateTime: {
        type: Date,
        required: function () {
            return ["in-progress", "repair-in-progress", "repair-completed"].includes(this.status);
        }
    },
    finalRepairDate: {
        type: Date,
        required: function () {
            return this.status === "repair-completed";
        }
    },
    paymentStatus: {
        type: String,
        enum: ["paid", "unpaid"],
        required: function () {
            return this.status === "repair-completed";
        }
    },
    attachments: {
        type: [String], // Array of file URLs (e.g., images of the issue)
        required: false,
        description: "Attachments like images or documents provided by the client."
    },
    clientNotes: {
        type: String,
        required: false,
        trim: true,
        maxLength: [300, "Notes cannot exceed 300 characters."],
        description: "Additional notes or comments provided by the client."
    },
    statusHistory: [statusHistorySchema], // Tracks all status changes
    technicianHistory: [technicianHistorySchema] // Tracks all technician assignments
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Pre-save middleware to log status changes
repairRequestSchema.pre("save", async function (next) {
    if (this.isModified("status")) {
        this.statusHistory.push({
            status: this.status,
            updatedBy: this.updatedBy || this.client, // Add the user making the change
            comments: this.statusComments || "" // Optional comments during status changes
        });
    }
    next();
});

export const RepairRequest = mongoose.model("RepairRequest", repairRequestSchema);
