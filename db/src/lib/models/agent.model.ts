import mongoose from 'mongoose';

const FirewallAgentSchema = new mongoose.Schema({
    nodeId: {
        type: String,  // Unique identifier for the node where the agent is installed
        required: true,
        unique: true
    },
    ipAddress: {
        type: String,  // IP address of the node
        required: true
    },
    status: {
        type: String,  // Status of the agent: 'active', 'inactive', 'error', etc.
        enum: ['active', 'inactive', 'error'],
        default: 'active'
    },
    policies: [{
        type: String  // Policies assigned to this agent (could reference policy IDs)
    }],
    version: {
        type: String,  // Firewall agent version
        required: true
    },
    lastCommunication: {
        type: Date,  // Timestamp of the last communication with the central management console
        default: Date.now
    },
    systemInfo: {
        os: { type: String },  // Operating system of the node (Windows, Linux, etc.)
        cpuUsage: { type: Number },  // CPU usage percentage
        memoryUsage: { type: Number },  // Memory usage percentage
        diskUsage: { type: Number }  // Disk usage percentage
    },
    installedAt: {
        type: Date,  // Date when the firewall agent was installed
        default: Date.now
    },
    networkTrafficLogs: [{
        timestamp: { type: Date, default: Date.now },  // Timestamp of log entry
        sourceIP: { type: String },  // Source IP address in the traffic
        destinationIP: { type: String },  // Destination IP address
        protocol: { type: String },  // Protocol used (TCP, UDP, etc.)
        port: { type: Number },  // Port number
        dataTransferred: { type: Number }  // Amount of data transferred (in bytes)
    }],
    anomalyDetected: {
        type: Boolean,  // Indicates if an anomaly was detected by the firewall agent
        default: false
    },
    anomalyDetails: {
        type: String  // Details about the anomaly if detected
    },
    refreshToken: {
        type: String  // Refresh token for the firewall agent authentication
    }
});

export const FirewallAgent = mongoose.model('FirewallAgent', FirewallAgentSchema);

