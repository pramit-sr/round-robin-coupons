import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import "./App.css";

const API_BASE_URL = "https://round-robin-coupons-backend.onrender.com/api/coupons";

function App() {
  const [availableCoupon, setAvailableCoupon] = useState("");
  const [enteredCoupon, setEnteredCoupon] = useState("");
  const [claimedCoupon, setClaimedCoupon] = useState("");
  const [noCoupons, setNoCoupons] = useState(false);
  const [claimError, setClaimError] = useState("");

  // Fetch an Available Coupon
  const fetchCoupon = async () => {
    try {
      const response = await axios.get(API_BASE_URL, { withCredentials: true });
      console.log("API Response:", response.data);

      if (response.data.message === "No coupons available") {
        setNoCoupons(true);
        setAvailableCoupon("");
      } else {
        setAvailableCoupon(response.data.coupon);
        setNoCoupons(false);
      }
    } catch (error) {
      console.error("Error Fetching Coupon:", error);
      setNoCoupons(true);
    }
  };

  // Claim a Coupon
  const claimCoupon = async () => {
    if (!enteredCoupon) {
      setClaimError("⚠ Please enter a coupon code.");
      return;
    }
  
    try {
      const response = await axios.post(
        `${API_BASE_URL}/claim`,
        { code: enteredCoupon },  // ✅ Send entered coupon
        { withCredentials: true } // ✅ Ensure cookies are sent
      );
  
      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }
  
      console.log("✅ Coupon Claimed:", response.data);
      setClaimedCoupon(response.data.coupon);
      setClaimError(""); // Clear previous errors
    } catch (error) {
      console.error("❌ Error Claiming Coupon:", error);
  
      if (error.response) {
        console.error("🚨 Server Response Error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("⚠ No response received from server.");
      } else {
        console.error("🔴 Request error:", error.message);
      }
  
      setClaimError(error.response?.data?.message || "Error claiming coupon");
    }
  };
  

  return (
    <div>
      <Navbar />
      <Hero
        availableCoupon={availableCoupon}
        noCoupons={noCoupons}
        enteredCoupon={enteredCoupon}
        setEnteredCoupon={setEnteredCoupon}
        fetchCoupon={fetchCoupon}
        claimCoupon={claimCoupon}
        claimedCoupon={claimedCoupon}
        claimError={claimError}
      />
    </div>
  );
}

export default App;
