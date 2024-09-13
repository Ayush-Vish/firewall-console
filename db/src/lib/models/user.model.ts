import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    email: { type: String, required: true, unique: true },
    apiKey: { type: String }, // API Key for authentication
    refreshToken: { type: String }, // For token refresh
    createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
