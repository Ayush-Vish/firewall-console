import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema({
    deviceName: { type: String, required: true },
    platform: { type: String }, // OS platform (Windows, Linux, etc.)
    ip: { type: String }, // Captured IP address
    apiKey: { type: String, required: true, unique: true }, // Unique API Key per node
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Associated user
    metadata: { 
        os: { type: String }, // Operating System
        cpuUsage: { type: Number }, // CPU usage %
        memoryUsage: { type: Number }, // Memory usage %
        diskUsage: { type: Number }, // Disk usage %
    },
    lastPing: { type: Date }, // Last communication time
    installedAt: { type: Date, default: Date.now }, // Installation time
    firewallPolicies: [{ 
        application: { type: String }, // Application name
        allowedDomains: [{ type: String }], // Allowed domains for this app
        allowedIPs: [{ type: String }], // Allowed IP addresses
        allowedProtocols: [{ type: String }], // Allowed protocols
        allowedPorts: [{ type: Number }] // Allowed ports
    }]
});

export const Node = mongoose.model('Node', nodeSchema);
