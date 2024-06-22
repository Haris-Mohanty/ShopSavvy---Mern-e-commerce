import AddressModel from "../Models/AddressModel.js";
import PaymentModel from "../Models/PaymentModel.js";
import UserModel from "../Models/UserModel.js";
import razorpayInstance from "../config/paymentConfig.js";
import validator from "validator";

//************* CHECK OUT || PLACE ORDER || PAYMENT ****/
export const createPaymentController = async (req, res) => {
  try {
    const { products, amount, paymentMethod, addressId } = req.body;

    // Get user and validate
    const userId = req.user;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Validate products (must be an array with at least one product)
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Products must be a non-empty array",
      });
    }

    // Validate amount (must be a positive number)
    if (!validator.isDecimal(amount.toString()) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a valid positive number",
      });
    }

    // Validate paymentMethod
    if (!["Online", "Cash On Delivery"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // Validate Address
    const address = await AddressModel.findById(addressId);
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }

    // Payment details setup
    let paymentDetails;

    if (paymentMethod === "Online") {
      // Online payment setup (Razorpay)
      const options = {
        amount: amount * 100, // amount in paisa
        currency: "INR",
        receipt: `order_${Date.now()}`,
      };
      const response = await razorpayInstance.orders.create(options);

      // Save Payment Order in Database
      paymentDetails = new PaymentModel({
        products,
        userId,
        amount,
        paymentId: response.id,
        paymentMethod,
        paymentStatus: response.status,
        addressId,
        paymentReceipt: response.receipt,
      });
    } else {
      // Cash on Delivery payment setup (immediately authorized)
      paymentDetails = new PaymentModel({
        products,
        userId,
        amount,
        paymentMethod,
        paymentStatus: "Authorized",
        addressId,
      });
    }
    const newPaymentOrder = await paymentDetails.save();

    return res.status(200).json({
      success: true,
      data: newPaymentOrder,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

//************* VERIFY PAYMENT AND SAVE DATA ************/
export const verifyPaymentController = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};
