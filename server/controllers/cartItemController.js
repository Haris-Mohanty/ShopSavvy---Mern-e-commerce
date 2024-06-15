import CartItemModel from "../Models/CartItemModel.js";
import ProductModel from "../Models/ProductModel.js";
import UserModel from "../Models/UserModel.js";

//**************** ADD TO CART CONTROLLER *************/
export const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user;

    // Validation
    if (!productId) {
      return res.status(422).json({
        success: false,
        message: "Please add product",
      });
    }

    // Check the product is exist or not
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    // Check the user is exist or not
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Check if the item already exists in the cart
    let existingCartItem = await CartItemModel.findOne({ userId, productId });
    if (existingCartItem) {
      return res.status(409).json({
        success: false,
        message: "Product already exists in the cart!",
      });
    }

    // Create new cart item
    const newCartItem = new CartItemModel({ userId, productId, quantity: 1 });
    await newCartItem.save();

    // Response
    return res.status(200).json({
      success: true,
      message: "Product added to the cart successfully!",
      data: newCartItem,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

//**************** COUNT CART ITEMS CONTROLLER *************/
export const countCartItemsController = async (req, res) => {
  try {
    const userId = req.user;

    const cartItemCount = await CartItemModel.countDocuments({
      userId: userId,
    });

    return res.status(200).json({
      success: true,
      count: cartItemCount,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

//**************** GET CART ITEMS CONTROLLER *************/
export const getCartItemsController = async (req, res) => {
  try {
    const userId = req.user;

    // User validation
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Fetch cart items
    const cartItems = await CartItemModel.find({ userId: userId }).populate(
      "productId"
    );

    // Response
    res.status(200).json({
      success: true,
      count: cartItems.length,
      items: cartItems,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

//****** UPDATE CART ITEMS CONTROLLER (INCREASE, DECREASE) *******/
export const updateCartItemsController = async (req, res) => {
  try {
    const userId = req.user;
    const { productId, action } = req.body;

    //Validation
    if (!productId || !action) {
      return res.status(400).json({
        success: false,
        message: "Please add productId and action!",
      });
    }

    // Find the cart item of user
    const cartItem = await CartItemModel.findOne({ userId, productId });
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart.",
      });
    }

    // Handle Increase or Decrease items
    if (action === 'increase') {
      cartItem.quantity += 1
    } else if (action === 'decrease') {
      if (cartItem.quantity - 1 <= 0) {
        return res.status(400).json({
          success: false,
          message: "Item quantity cannot be less than 1",
        });
      }
      cartItem.quantity -= 1
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid action. Use 'increase' or 'decrease'.",
      });
    }

    // Save the updated cart
    await cartItem.save()

    //Success res
    return res.status(200).json({
      cartItem
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};
