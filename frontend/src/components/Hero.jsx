import React from "react";
import "./Hero.css";

function Hero({ availableCoupon, noCoupons, enteredCoupon, setEnteredCoupon, fetchCoupon, claimCoupon, claimedCoupon, setClaimedCoupon, claimError, setClaimError }) {
  const handleClaimCoupon = async () => {
    if (!enteredCoupon) {
      setClaimError("⚠ Please enter a coupon code.");
      return;
    }

    setClaimedCoupon(""); // ✅ Clear previous state
    setClaimError("");

    await claimCoupon(); // ✅ Call API to claim the coupon
  };

  return (
    <main className="hero container">
      <div className="hero-content">
        <h1>YOUR OWN SALES TEAM</h1>
        <p>THE SALES STUDIO SPECIALIZES IN SALES STRATEGIES AND LEAD GENERATION.</p>

        <div className="hero-btn">
          <button className="primary-btn">
            <a href="https://www.linkedin.com/company/thesalesstudio/" target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none" }}>
              Know More
            </a>
          </button>
        </div>
      </div>

      {/* ✅ Coupon Claiming Section */}
      <div className="hero-image">
        <div className="coupon-section">
          <h2>Claim Your Coupon</h2>
          <button onClick={fetchCoupon}>Show Next Coupon</button>
          {noCoupons ? <h3 style={{ color: "red" }}>No coupons available</h3> : availableCoupon && <h3>Available Coupon: {availableCoupon}</h3>}

          <div style={{ marginTop: "20px", marginRight: "15px" }}>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={enteredCoupon}
              onChange={(e) => setEnteredCoupon(e.target.value)}
            />
            <button onClick={handleClaimCoupon} style={{ marginLeft: "10px" }}>Claim Coupon</button>
          </div>

          {/* ✅ Show messages correctly */}
          {claimError ? <h3 style={{ color: "red" }}>{claimError}</h3> : claimedCoupon && <h3 style={{ color: "green" }}>Claimed: {claimedCoupon}</h3>}
        </div>
      </div>
    </main>
  );
}

export default Hero;
.