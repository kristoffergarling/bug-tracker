import mongoose, { Schema, Document, Types } from "mongoose";
import { IComment } from "./comment";

export interface IBug extends Document {
  projectId: string;
  title: string;
  description: string;
  priority: string;
  isOpen: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  closedBy: string | null;
  closedAt: Date | null;
  comments: Types.ObjectId[];
}

const bugSchema: Schema = new mongoose.Schema({
  projectId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  isOpen: { type: Boolean, default: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  closedBy: { type: String, default: null },
  closedAt: { type: Date, default: null },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model<IBug>("Bug", bugSchema);
