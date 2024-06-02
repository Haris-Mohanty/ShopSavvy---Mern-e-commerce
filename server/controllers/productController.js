import validator from "validator";
import ProductModel from "../Models/ProductModel.js";
import UserModel from "../Models/UserModel.js";

//**************** UPLOAD PRODUCT ***********/
export const uploadProductController = async (req, res) => {
  try {
    // Check is the user is admin or not
    const userId = req.user;
    const user = await UserModel.findById(userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    // Get the data from client
    const {
      productName,
      brandName,
      category,
      productImage,
      price,
      sellingPrice,
      description,
    } = req.body;

    // Validation
    if (
      !productName ||
      !brandName ||
      !category ||
      !price ||
      !sellingPrice ||
      !description
    ) {
      return res.status(422).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Validation of product image
    if (!Array.isArray(productImage) || productImage.length === 0) {
      return res.status(422).json({
        success: false,
        message: "At least one product image is required",
      });
    }

    //Validation of product price
    if (!validator.isFloat(price.toString(), { gt: 0 })) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }

    //Validation of product selling price
    if (!validator.isFloat(sellingPrice.toString(), { gt: 0 })) {
      return res.status(400).json({
        success: false,
        message: "Selling price must be a positive number",
      });
    }

    // Selling price is less than actual price
    if (parseFloat(sellingPrice) > parseFloat(price)) {
      return res.status(400).json({
        success: false,
        message: "Selling price cannot be higher than price",
      });
    }

    // Upload Product
    const uploadProduct = new ProductModel(req.body);

    // Save the product to the database
    const saveedProduct = await uploadProduct.save();

    //Success res
    return res.status(201).json({
      success: true,
      message: "Product uploaded successfully!",
      saveedProduct,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};
