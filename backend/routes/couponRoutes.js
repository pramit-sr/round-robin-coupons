import express from "express";
import { claimCoupon } from "../controllers/couponController.js";
import { checkAbuse } from "../middleware/abusePrevention.js";

const router = express.Router();

router.post("/claim", checkAbuse, claimCoupon);

export default router;
