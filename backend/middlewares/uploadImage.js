import cloudinary from "cloudinary";
import ErrorHandler from "./errorMiddleware.js"; // Import your existing error handler

const ALLOWED_IMAGE_FORMATS = ["image/png", "image/jpeg", "image/webp"];

export const uploadImagesMiddleware = async (req, res, next) => {
    try {
        if (!req.files || !req.files.images) {
            return next(); // No images uploaded, continue without error
        }

        const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

        const uploadedImageUrls = [];

        for (const image of images) {
            if (!ALLOWED_IMAGE_FORMATS.includes(image.mimetype)) {
                return next(new ErrorHandler("Unsupported image format.", 400));
            }

            // Upload to Cloudinary
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(image.tempFilePath);

            if (!cloudinaryResponse || cloudinaryResponse.error) {
                return next(new ErrorHandler("Image upload failed.", 500));
            }

            uploadedImageUrls.push(cloudinaryResponse.secure_url);
        }

        req.imageUrls = uploadedImageUrls; // Attach uploaded image URLs to request
        next();
    } catch (error) {
        next(new ErrorHandler("Image processing error.", 500));
    }
};
