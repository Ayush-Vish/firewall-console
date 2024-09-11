import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    nodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', required: true }, // Reference to the node
    ip: { type: String, required: true },  // IP address of the node
    logType: { type: String, required: true },  // Type of log e.g., 'info', 'warning', 'error'
    message: { type: String, required: true },  // Log message
    timestamp: { type: Date, default: Date.now },  // Timestamp of the log
    additionalInfo: { type: mongoose.Schema.Types.Mixed } // Any additional info (can be an object)
});

export const Log = mongoose.model('Log', logSchema);
