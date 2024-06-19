import AddressModel from "../Models/AddressModel.js";
import UserModel from "../Models/UserModel.js";
import validator from "validator";

//************ CREATE ADDRESS CONTROLLER *************/\
export const createAddressController = async (req, res) => {
  try {
    //Get User by userId
    const userId = req.user;

    // Check user exist or not
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Destructure address details from request body
    const { houseNo, area, postalCode, district, state, country, landMark } =
      req.body;

    // Validate address details
    if (
      validator.isEmpty(houseNo) ||
      !validator.isLength(houseNo, { min: 1, max: 15 })
    ) {
      return res.status(400).json({
        success: false,
        message: "House No is required and must be between 1 to 15 characters",
      });
    }

    if (
      validator.isEmpty(area) ||
      !validator.isLength(area, { min: 1, max: 50 })
    ) {
      return res.status(400).json({
        success: false,
        message: "Area is required and must be between 1 to 50 characters",
      });
    }

    if (
      validator.isEmpty(postalCode) ||
      !validator.isPostalCode(postalCode, "IN")
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Postal code is required and must be a valid Indian postal code",
      });
    }

    if (
      validator.isEmpty(district) ||
      !validator.isLength(district, { min: 1, max: 15 })
    ) {
      return res.status(400).json({
        success: false,
        message: "District is required and must be between 1 to 15 characters",
      });
    }

    if (
      validator.isEmpty(state) ||
      !validator.isLength(state, { min: 1, max: 15 })
    ) {
      return res.status(400).json({
        success: false,
        message: "State is required and must be between 1 to 15 characters",
      });
    }

    if (
      validator.isEmpty(country) ||
      !validator.isLength(country, { min: 1, max: 15 })
    ) {
      return res.status(400).json({
        success: false,
        message: "Country is required and must be between 1 to 15 characters",
      });
    }

    // Create new address
    const newAddress = new AddressModel({
      userId,
      houseNo,
      area,
      postalCode,
      district,
      state,
      country,
      landMark,
    });

    // Save new address
    const savedAddress = await newAddress.save();

    // Update user's addresses array (push the new address's ObjectId)
    user.addresses.push(savedAddress._id);
    await user.save();

    // Success Response
    return res.status(200).json({
      success: true,
      message: "Address created successfully",
      data: savedAddress,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
