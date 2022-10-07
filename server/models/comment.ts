import mongoose from "mongoose";

export interface IComment {
  text: string;
  createdBy: string;
  createdAt: Date;
  id: string;
}

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  id: { type: String },
});

export default mongoose.model("Comment", commentSchema);
