import mongoose from "mongoose";

const anomalySchema = new mongoose.Schema({
      endpoint: { type: mongoose.Schema.Types.ObjectId, ref: 'Endpoint', required: true },
      applicationName: { type: String, required: true },
      anomalyType: { type: String, required: true }, // e.g., 'suspicious traffic spike', 'unusual domain access'
      description: { type: String },
      severity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
      detectedAt: { type: Date, default: Date.now },
      resolved: { type: Boolean, default: false }
  });
export const Anomaly = mongoose.model('Anomaly', anomalySchema);