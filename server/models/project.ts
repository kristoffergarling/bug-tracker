import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  contributors: [{ type: String, required: true }],
  bugs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bug" }],
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  id: { type: String },
});

export default mongoose.model("Project", projectSchema);
