export const checkCookieAbuse = (req, res, next) => {
    //Check if the user already claimed a coupon in this session
    if (req.cookies.claimedCoupon) {
      return res.status(429).json({ message: "You have already claimed a coupon in this session." });
    }
  
    next();
  };
  