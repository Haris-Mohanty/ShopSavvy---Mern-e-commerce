import razorpayInstance from "../config/paymentConfig.js";
import validator from "validator";

//************* CHECK OUT || PLACE ORDER || PAYMENT ****/
export const createPaymentController = async (req, res) => {
  try {
    const { amount } = req.body;

    // Validate amount (must be a positive number)
    if (!validator.isDecimal(amount.toString()) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a valid positive number",
      });
    }

    const options = {
      amount: amount * 100, // amount in paisa
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    const response = await razorpayInstance.orders.create(options);
    return res.status(200).json({
      success: true,
      data: {
        orderId: response.id,
        amount: response.amount,
        currency: response.currency,
        receipt: response.receipt,
        status: response.status,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};
