import UserModel from "../Models/UserModel.js";
import PaymentModel from "../Models/PaymentModel.js";

//************** GET ALL USERS *****************/
export const getAllUserController = async (req, res) => {
  try {
    const userId = req.user;
    const user = await UserModel.findById(userId);

    // Check is the user is admin or not
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = 6;

    //Calculate skip value
    const skip = (page - 1) * limit;

    // Search
    const filters = {};

    // Get total user for counting total page
    const totalUser = await UserModel.countDocuments(filters);
    const totalPages = Math.ceil(totalUser / limit);
    if (page > totalPages) {
      return res.status(404).json({
        success: false,
        message: "Page not Found!",
      });
    }

    const allUsers = await UserModel.find(filters)
      .skip(skip)
      .limit(limit)
      .select("-password");

    return res.status(200).json({
      success: true,
      totalUsers: totalUser,
      totalPages: totalPages,
      currentPage: page,
      allUsers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************** UPDATE USER *****************/
export const updateUserController = async (req, res) => {
  try {
    const { name, email, isAdmin } = req.body;
    const id = req.params.id;

    if (!name || !email) {
      return res.status(422).json({
        success: false,
        message: "Please provide all fields!",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email, isAdmin },
      { new: true }
    );

    // Check if user exists
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************** DELETE USER *****************/
export const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id;

    // Delete User
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    //Success response
    return res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//*********** GET ALL ORDERS CONTROLLER *****************/
export const getAllOrdersController = async (req, res) => {
  try {
    const userId = req.user;
    const user = await UserModel.findById(userId);

    // Check is the user is admin or not
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = 6;

    //Calculate skip value
    const skip = (page - 1) * limit;

    // Search
    const filters = {};

    // Get total orders for counting total pages
    const totalOrders = await PaymentModel.countDocuments(filters);
    const totalPages = Math.ceil(totalOrders / limit);
    if (page > totalPages) {
      return res.status(404).json({
        success: false,
        message: "Page not Found!",
      });
    }

    // Get all orders
    const allOrders = await PaymentModel.find(filters)
      .skip(skip)
      .limit(limit)
      .populate("products.productId")
      .populate("addressId")
      .populate("userId");

    return res.status(200).json({
      success: true,
      totalOrders: totalOrders,
      totalPages: totalPages,
      currentPage: page,
      data: allOrders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//*********** UPDATE ORDER STATUS CONTROLLER *****************/
export const updateOrderStatusController = async (req, res) => {
  try {
    const userId = req.user;
    const user = await UserModel.findById(userId);

    // Check is the user is admin or not
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    const { orderId, status } = req.body;

    const order = await PaymentModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const validStatuses = [
      "Created",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    order.orderStatus = status;
    await order.save();

    return res.status(200).json({
      success: true,
      data: order,
      message: "Order status updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//*********** DELETE ORDER CONTROLLER *****************/
export const deleteOrderController = async (req, res) => {
  try {
    const userId = req.user;
    const user = await UserModel.findById(userId);

    // Check is the user is admin or not
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    const { orderId } = req.body;

    // Validate orderId
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required.",
      });
    }

    // Get order
    const order = await PaymentModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // Perform delete operation
    await PaymentModel.findByIdAndDelete(orderId);

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
