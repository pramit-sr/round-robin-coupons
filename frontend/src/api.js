export const claimCoupon = async () => {
    try {
      const response = await fetch("https://round-robin-coupons-backend.onrender.com/api/coupons/claim", {  // ✅ Update to match your backend port
        method: "POST",
        credentials: "include", // ✅ Important for cookies
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      return await response.json();
    } catch (error) {
      return { message: "Error claiming coupon" };
    }
  };
  