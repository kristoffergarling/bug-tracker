import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  registerDate: Date;
}

const userSchema: Schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  registerDate: { type: Date, required: true, default: new Date() },
});

export default mongoose.model<IUser>("User", userSchema);
