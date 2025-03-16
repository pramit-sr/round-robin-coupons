import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import coupons from "./coupons.js";  
import { checkIPAbuse } from "./ipTracking.js";  // IP tracking
import { checkCookieAbuse } from "./cookieTracking.js";  // Cookie tracking

const app = express();
const PORT = 5001;

app.use(cors({ origin: "https://round-robin-coupons-lyart.vercel.app/", credentials: true }));
app.use(express.json());
app.use(cookieParser());

let currentIndex = 0;
const CLAIM_TIME_LIMIT = 60 * 60 * 1000; // 1-hour restriction

// API to Assign the Next Coupon (One per Guest)
app.get("/api/coupons", (req, res) => {
  if (coupons.length === 0) {
    return res.json({ message: "No coupons available" });
  }

  //  Assign only the next coupon in sequence
  const coupon = coupons[currentIndex];
  console.log(" Assigning coupon:", coupon.code);

  // Move to the next coupon in round-robin order
  currentIndex = (currentIndex + 1) % coupons.length;

  res.json({ coupon: coupon.code });
});

// API to Claim a Coupon (Uses Both IP & Cookie Tracking)
app.post("/api/coupons/claim", checkIPAbuse, checkCookieAbuse, (req, res) => {
  const { code } = req.body;

  //  Validate coupon code
  const isValidCoupon = coupons.some((coupon) => coupon.code === code);
  if (!isValidCoupon) {
    return res.status(400).json({ message: "Invalid coupon code" });
  }

  //  Store the claim in cookies (valid for 1 hour)
  res.cookie("claimedCoupon", code, { maxAge: CLAIM_TIME_LIMIT, httpOnly: true });

  console.log(`✅ Coupon claimed: ${code}`);
  res.json({ coupon: code });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
