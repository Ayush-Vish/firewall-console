import mongoose from "mongoose";

const endpointSchema = new mongoose.Schema({
      hostname: { type: String, required: true },
      ipAddress: { type: String, required: true },
      os: { type: String, enum: ['Windows', 'Linux'], required: true },
      status: { type: String, enum: ['active', 'inactive'], default: 'active' },
      lastUpdated: { type: Date, default: Date.now },
      policies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FirewallPolicy' }],
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
  });

export const Endpoint = mongoose.model('Endpoint', endpointSchema);