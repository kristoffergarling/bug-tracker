import mongoose, { Schema } from "mongoose";

export interface IProject {
  title: string;
  description: string;
  contributors: string[];
  bugs: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  contributors: [{ type: String, required: true }],
  bugs: [{ type: String, default: [] }],
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.model("Project", projectSchema);
