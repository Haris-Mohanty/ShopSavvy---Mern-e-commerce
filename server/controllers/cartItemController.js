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
