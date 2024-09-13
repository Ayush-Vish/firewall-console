import mongoose from 'mongoose';

const FirewallAgentSchema = new mongoose.Schema({
    nodeId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Node',  // Link to the node
        required: true,
        unique: true
    },
    ipAddress: { 
        type: String,  // IP address of the node
        required: true
    },
    status: { 
        type: String,  // Status: 'active', 'inactive', 'error', etc.
        enum: ['active', 'inactive', 'error'], 
        default: 'active' 
    },
    version: { 
        type: String,  // Firewall agent version
        required: true 
    },
    lastCommunication: { 
        type: Date,  // Last communication timestamp
        default: Date.now 
    },
    systemInfo: {
        os: { type: String },  // OS (Windows, Linux, etc.)
        cpuUsage: { type: Number },  // CPU usage
        memoryUsage: { type: Number },  // Memory usage
        diskUsage: { type: Number }  // Disk usage
    },
    networkTrafficLogs: [{ 
        timestamp: { type: Date, default: Date.now },  // Timestamp of log entry
        sourceIP: { type: String },  // Source IP in the traffic
        destinationIP: { type: String },  // Destination IP address
        protocol: { type: String },  // Protocol (TCP, UDP, etc.)
        port: { type: Number },  // Port number
        dataTransferred: { type: Number }  // Amount of data transferred (in bytes)
    }],
    anomalyDetected: { 
        type: Boolean,  // If an anomaly is detected
        default: false 
    },
    anomalyDetails: { 
        type: String  // Anomaly details
    },
    refreshToken: { 
        type: String  // Refresh token for agent authentication
    }
});

export const FirewallAgent = mongoose.model('FirewallAgent', FirewallAgentSchema);
