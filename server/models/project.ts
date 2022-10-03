import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  bugs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bug" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  id: { type: String },
});

export default mongoose.model("Project", projectSchema);
