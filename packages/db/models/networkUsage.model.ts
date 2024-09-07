import mongoose from "mongoose";

const networkUsageSchema = new mongoose.Schema({
  endpoint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Endpoint",
    required: true,
  },
  applicationName: { type: String, required: true },
  domainAccessed: { type: String, required: true },
  ipAccessed: { type: String, required: true },
  protocolUsed: { type: String, required: true },
  dataTransferred: { type: Number }, // in bytes
  timestamp: { type: Date, default: Date.now },
});
