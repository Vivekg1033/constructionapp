import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const addressSchema = new mongoose.Schema({
    residency: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Residency name must contain at least 3 characters."],
        description: "Flat number, house name, or building name."
    },
    street: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Street name must contain at least 3 characters."],
        description: "Street name or road."
    },
    landmark: {
        type: String,
        required: false,
        trim: true,
        description: "Nearby landmark for easier identification."
    },
    city: {
        type: String,
        required: true,
        trim: true,
        description: "City name."
    },
    state: {
        type: String,
        required: true,
        trim: true,
        description: "State or province name."
    },
    country: {
        type: String,
        required: true,
        trim: true,
        default: "India",
        description: "Country name."
    },
    pincode: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[1-9][0-9]{5}$/.test(v); // Validate Indian PIN codes
            },
            message: "Please provide a valid 6-digit PIN code."
        },
        description: "Postal code (PIN code) for the area."
    },
    latitude: {
        type: Number,
        required: false,
        description: "Latitude coordinate for geolocation."
    },
    longitude: {
        type: Number,
        required: false,
        description: "Longitude coordinate for geolocation."
    }
});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name must contain at least 3 characters."]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name must contain at least 3 characters."]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email."]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must contain at least 8 characters."],
        select: false
    },
    role: {
        type: String,
        enum: ['client', 'technician', 'admin'],
        required: true
    },
    address: {
        type: addressSchema,
        required: function () {
            return this.role === 'client' || this.role === 'technician';
        }
    },
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({
            id: this._id
        },
        process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES
        },
    )
}

export const User = mongoose.model('User', userSchema);