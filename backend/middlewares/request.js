import { RepairRequest } from "../models/RepairRequestSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";

export const recentSameRequest = catchAsyncErrors(async (req, res, next) => {

    const { purpose, description } = req.body;
    // Check if a similar request already exists within a short timeframe (e.g., last 10 minutes)
    const recentRequest = await RepairRequest.findOne({
        client: req.user._id,
        // description,
        purpose,
        initiationDateTime: { $gte: new Date(Date.now() - 60 * 60 * 1000) } // Last 10 minutes
    });

    if (recentRequest) {
        return next(new ErrorHandler("You have already made a similar request recently. Please wait before submitting again.", 400));
    }

    console.log(req.user._id)

    console.log(req.user)

    console.log(recentRequest);

    next();
})