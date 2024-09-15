import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  attackType: {
      type: String,
      required: true,
  },
  severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
  },
  detectedAt: {
      type: Date,
      required: true,
  },
  affectedServices: {
      type: [String],
      default: []
  },
  additionalInfo: {
      type: mongoose.Schema.Types.Mixed,  // Allows flexibility for additional data
      default: {}
  },
  nodeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Node',
      required: true,
  },
  ip: {
      type: String,
      required: true,
  },
  isSeen:{
        type: Boolean,
        default: false,
  },
    isResolved:{
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export const Alert = mongoose.model('Alert', alertSchema);
