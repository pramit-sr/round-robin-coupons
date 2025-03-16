const CLAIM_TIME_LIMIT = 60 * 60 * 1000; // 1-hour restriction
const claimedIPs = {}; // Stores IPs and claim timestamps

export const checkIPAbuse = (req, res, next) => {
  const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(`User IP: ${userIP}`);

  if (!userIP) {
    return res.status(500).json({ message: "Could not detect user IP" });
  }

  const now = Date.now();

  // Check if the IP already claimed within 1 hour
  if (claimedIPs[userIP] && now - claimedIPs[userIP] < CLAIM_TIME_LIMIT) {
    console.log(`User ${userIP} tried claiming again too soon!`);
    return res.status(429).json({ message: "Wait before claiming another coupon." });
  }

  claimedIPs[userIP] = now; //Store claim time for this IP
  next();
};
