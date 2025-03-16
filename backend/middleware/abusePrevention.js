export const checkAbuse = (req, res, next) => {
  // ✅ Get the real user IP (Fix for Render/Vercel)
  let userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // ✅ If 'x-forwarded-for' exists, take the first IP (real client IP)
  if (userIP.includes(",")) {
    userIP = userIP.split(",")[0].trim();
  }

  console.log(`🔍 Detected User IP: ${userIP}`);

  if (!userIP) {
    return res.status(500).json({ message: "Could not detect user IP" });
  }

  const lastClaimed = req.cookies.lastClaimed || 0;
  const now = Date.now();

  if (now - lastClaimed < 10 * 1000) { // ✅ 10-second restriction
    return res.status(429).json({ message: "Wait before claiming another coupon." });
  }

  res.cookie("lastClaimed", now, { httpOnly: true });
  next();
};
