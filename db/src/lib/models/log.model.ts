import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    nodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', required: true }, // Node reference
    ip: { type: String, required: true },  // IP address of the node
    logType: { type: String, required: true },  // Type: 'info', 'warning', 'error', etc.
    message: { type: String, required: true },  // Log message
    timestamp: { type: Date, default: Date.now },  // Timestamp
    additionalInfo: { type: mongoose.Schema.Types.Mixed } // Additional info if any
});

export const Log = mongoose.model('Log', logSchema);
