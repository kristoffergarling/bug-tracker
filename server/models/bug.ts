import mongoose from "mongoose";

const bugSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, default: false },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  closedBy: { type: String, default: null },
  closeAt: { type: Date, default: null },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  id: { type: String },
});

export default mongoose.model("Bug", bugSchema);
