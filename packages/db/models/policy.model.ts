import mongoose from "mongoose";

const firewallPolicySchema = new mongoose.Schema({
      applicationName: { type: String, required: true },
      allowedDomains: [{ type: String }],
      allowedIPs: [{ type: String }],
      allowedProtocols: [{ type: String }],
      blockedDomains: [{ type: String }],
      blockedIPs: [{ type: String }],
      blockedProtocols: [{ type: String }],
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin who created the policy
      createdAt: { type: Date, default: Date.now }
  });

export const FirewallPolicy = mongoose.model('FirewallPolicy', firewallPolicySchema);