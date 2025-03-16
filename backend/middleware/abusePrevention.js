export const checkAbuse = (req, res, next) => {
  const userIP = req.ip;
  const lastClaimed = req.cookies.lastClaimed || 0;
  const now = Date.now();

  if (now - lastClaimed < 10 * 1000) {  // Now users must wait 10 seconds
      return res.status(429).json({ message: "Wait before claiming another coupon." });
  }

  res.cookie("lastClaimed", now, { httpOnly: true });
  next();
};
