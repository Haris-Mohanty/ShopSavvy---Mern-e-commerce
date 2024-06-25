import AddressModel from "../Models/AddressModel.js";
import PaymentModel from "../Models/PaymentModel.js";
import UserModel from "../Models/UserModel.js";
import razorpayInstance from "../config/paymentConfig.js";
import validator from "validator";
import crypto from "crypto";

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

    if (!addressId) {
      return res.status(422).json({
        success: false,
        message: "Please select address!",
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
        paymentId: "",
        paymentMethod,
        paymentStatus: "Authorized",
        addressId,
        paymentReceipt: "",
      });
    }
    const newPaymentOrder = await paymentDetails.save();

    return res.status(201).json({
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
    const { orderId, paymentId, signature } = req.body;

    // Validate required fields
    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Verify if RAZORPAY_KEY_SECRET is available
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Razorpay key secret is not configured",
      });
    }

    // Verify signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${orderId}|${paymentId}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    // Find the payment record
    const payment = await PaymentModel.findOne({ paymentId: orderId });
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    // Check if the payment is already marked as "Paid"
    if (payment.paymentStatus === "Paid") {
      return res.status(200).json({
        success: true,
        message: "Payment is already verified",
        data: payment,
      });
    }

    // Update payment status in the database
    payment.paymentStatus = "Paid";
    await payment.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: payment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

//************* GET MY ORDER || GET ORDER DETAILS ****/
export const getMyOrdersController = async (req, res) => {
  try {
    const userId = req.user;

    // Find user to ensure it exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch orders for the user
    const orders = await PaymentModel.find({ userId })
      .populate("products.productId")
      .populate("addressId");

    // If no orders found
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    // Return success response with orders data
    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

//************* CANCEL ORDER ***************/
export const cancelOrderController = async (req, res) => {
  try {
    const userId = req.user;
    const { orderId } = req.body;

    // Find user to ensure it exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the order to ensure it exists
    const order = await PaymentModel.findOne({ _id: orderId, userId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if the order is already cancelled
    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled",
      });
    }

    // Update the order status to "Cancelled"
    order.orderStatus = "Cancelled";
    order.updatedAt = new Date();
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

//************* UPDATE ORDER PAYMENT DETAILS ************/
export const updateOrderPaymentController = async (req, res) => {
  try {
    const { orderId, paymentMethod, amount } = req.body;
    const userId = req.user;

    // Find user to ensure it exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the order to ensure it exists
    const order = await PaymentModel.findOne({ _id: orderId, userId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (paymentMethod === "Online") {
      // Online payment setup (Razorpay)
      const options = {
        amount: amount * 100, // amount in paisa
        currency: "INR",
        receipt: `order_${Date.now()}`,
      };
      const response = await razorpayInstance.orders.create(options);

      // Update Payment Order in Database
      order.paymentId = response.id;
      order.paymentMethod = paymentMethod;
      order.paymentStatus = response.status;
      order.paymentReceipt = response.receipt;
    } else {
      // If switching back to COD, update payment method and status
      order.paymentMethod = paymentMethod;
      order.paymentStatus = "Authorized";
    }

    const updatedOrder = await order.save();

    return res.status(200).json({
      success: true,
      message: "Order payment details updated successfully",
      data: updatedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};
