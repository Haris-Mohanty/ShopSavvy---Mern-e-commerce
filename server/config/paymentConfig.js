import razorpay from "razorpay";
import dotenv from "dotenv";

// Dotenv confi
dotenv.config();

// Create razorpay instance
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Export
export default razorpayInstance;
