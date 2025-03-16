import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  assignedToIP: { type: String, default: null },
  assignedAt: { type: Date, default: null }
});

export default mongoose.model("Coupon", couponSchema);
