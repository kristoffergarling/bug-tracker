import mongoose from "mongoose";

export interface IComment {
  text: string;
  createdBy: string;
  createdAt: Date;
  budId: string;
}

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  bugId: { type: String, required: true },
});

export default mongoose.model("Comment", commentSchema);
