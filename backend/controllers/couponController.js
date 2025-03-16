import Coupon from "../models/Coupon.js";

export const claimCoupon = async (req, res) => {
  try {
    const userIP = req.ip;
    const coupon = await Coupon.findOne({ assignedToIP: null });

    if (!coupon) {
      return res.status(400).json({ message: "No coupons available" });
    }

    coupon.assignedToIP = userIP;
    coupon.assignedAt = new Date();
    await coupon.save();

    res.json({ message: "Coupon claimed!", coupon: coupon.code });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
