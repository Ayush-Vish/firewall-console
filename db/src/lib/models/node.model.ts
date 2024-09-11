import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema({
    deviceName: { type: String, required: true },
    platform: { type: String }, // OS platform (Windows, Linux, etc.)
    ip: { type: String }, // Captured IP address
    apiKey: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    metadata: { type: Object }, // Store additional metadata such as CPU, OS, etc.
    lastPing: { type: Date } // Optionally store the last ping time
});

export const Node = mongoose.model('Node', nodeSchema);
