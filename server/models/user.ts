import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  registerDate: { type: Date, required: true, default: new Date() },
  id: { type: String },
});

export default mongoose.model("User", userSchema);
