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

//**************** GET ALL PRODUCTS CONTROLLER ***********/
export const getAllProductsController = async (req, res) => {
  try {
    const allProducts = await ProductModel.find().sort({ createdAt: -1 });

    if (!allProducts.length) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    // Success
    return res.status(200).json({
      success: true,
      allProducts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

//**************** UPDATE PRODUCT DETAILS CONTROLLER ***********/
export const updateProductController = async (req, res) => {
  try {
    // Check the user is admin or not
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

    // Update Product Details
    const updateProductDetails = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        productName,
        brandName,
        category,
        productImage,
        price,
        sellingPrice,
        description,
      },
      { new: true }
    );

    // Check the product is exists or not
    if (!updateProductDetails) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    //Success Response
    return res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      updateProductDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

//**************** GET PRODUCT CATEGORY CONTROLLER ***********/
export const getProductCategoryController = async (req, res) => {
  try {
    const productCategory = await ProductModel.distinct("category");

    // Array to store product from each category
    const productByCategory = [];

    for (const category of productCategory) {
      const product = await ProductModel.findOne({ category });

      if (product) {
        productByCategory.push(product);
      }
    }

    if (productByCategory.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for any category.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully.",
      data: productByCategory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

//**************** GET CATEGORY WISE PRODUCT CONTROLLER ***********/
export const getCategoryWiseProductController = async (req, res) => {
  try {
    const { category } = req.query || req.body;
    // Validate the category parameter
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    // Fetch products
    const products = await ProductModel.find({ category });

    // Validation
    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found for the given category",
      });
    }

    // Success res
    return res.status(200).json({
      success: true,
      totalProducts: products.length,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

//**************** GET PRODUCT DETAILS CONTROLLER ***********/
export const getProductDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    // Success
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

//******** SEARCH PRODUCT (NAME AND CATEGORY) CONTROLLER ******/
export const searchProductController = async (req, res) => {
  try {
    const queryParam = req.query.q;

    // Create a case-insensitive regular expression from the query
    const regex = new RegExp(
      queryParam.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i"
    );

    // Perform a search on the product model
    const products = await ProductModel.find({
      $or: [
        { productName: regex }, // Match products by name
        { category: regex }, // Match products by category
      ],
    });

    // When search query is empty
    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found!",
        data: [],
      });
    }

    // Success Res
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

//***************** FILTER PRODUCT CONTROLLER ***************/
export const filterProductController = async (req, res) => {
  try {
    const { priceSort, dateSort, categories } = req.query;

    // Create a query
    let query = {};

    // Handle category filtering
    if (categories) {
      const categoryArray = categories.split(",");
      query.category = {
        $in: categoryArray,
      };
    }

    // Create sort
    let sort = {};

    // Handle Price sort
    if (priceSort) {
      sort.sellingPrice = priceSort === "low-to-high" ? 1 : -1;
    }

    // Handle date sort
    if (dateSort) {
      sort.createdAt = dateSort === "newest" ? -1 : 1;
    }

    //Fetch product from the database
    const products = await ProductModel.find(query).sort(sort);

    // Success response
    return res.status(200).json({
      success: true,
      totalProducts: products.length,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};
