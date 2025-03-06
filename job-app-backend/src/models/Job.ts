import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ["open", "closed"], default: "open" },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Job", JobSchema);
