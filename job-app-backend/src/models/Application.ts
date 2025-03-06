import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  resumeUrl: String,
  parsedFields: Object,
  status: {
    type: String,
    enum: ["pending", "reviewed", "accepted", "rejected"],
    default: "pending",
  },
});

export default mongoose.model("Application", ApplicationSchema);
