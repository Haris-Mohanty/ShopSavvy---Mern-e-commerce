import AddressModel from "../Models/AddressModel.js";
import UserModel from "../Models/UserModel.js";
import validator from "validator";

//************ CREATE ADDRESS CONTROLLER *************/
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
    const {
      houseNo,
      area,
      postalCode,
      district,
      state,
      country,
      landMark,
      phoneNumber,
    } = req.body;

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

    // Validate area
    if (
      validator.isEmpty(area) ||
      !validator.isLength(area, { min: 1, max: 50 })
    ) {
      return res.status(400).json({
        success: false,
        message: "Area is required and must be between 1 to 50 characters",
      });
    }

    // Validate postal code
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

    // Validate dist
    if (
      validator.isEmpty(district) ||
      !validator.isLength(district, { min: 1, max: 15 })
    ) {
      return res.status(400).json({
        success: false,
        message: "District is required and must be between 1 to 15 characters",
      });
    }

    // Validate state
    if (
      validator.isEmpty(state) ||
      !validator.isLength(state, { min: 1, max: 15 })
    ) {
      return res.status(400).json({
        success: false,
        message: "State is required and must be between 1 to 15 characters",
      });
    }

    // Validate Country
    if (
      validator.isEmpty(country) ||
      !validator.isLength(country, { min: 1, max: 15 })
    ) {
      return res.status(400).json({
        success: false,
        message: "Country is required and must be between 1 to 15 characters",
      });
    }

    // Validate phone number
    if (
      validator.isEmpty(phoneNumber) ||
      !validator.isMobilePhone(phoneNumber, "en-IN")
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number is required and must be a valid Indian phone number",
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
      phoneNumber,
    });

    // Save new address
    const savedAddress = await newAddress.save();

    // Update user's addresses array (push the new address's ObjectId)
    user.addresses.push(savedAddress._id);
    await user.save();

    // Success Response
    return res.status(201).json({
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

//************ GET ADDRESS OF USER CONTROLLER *************/
export const getAddressOfUserController = async (req, res) => {
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

    // Get address
    const addresses = await AddressModel.find({ userId: userId }).populate(
      "userId"
    );

    if (addresses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No address found of this user!",
      });
    }

    // Success Response
    return res.status(200).json({
      success: true,
      count: addresses.length,
      data: addresses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************ UPDATE ADDRESS CONTROLLER *************/
export const updateAddressController = async (req, res) => {
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
    const {
      id,
      houseNo,
      area,
      postalCode,
      district,
      state,
      country,
      phoneNumber,
      landMark,
    } = req.body;

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

    // Validate area
    if (
      validator.isEmpty(area) ||
      !validator.isLength(area, { min: 1, max: 50 })
    ) {
      return res.status(400).json({
        success: false,
        message: "Area is required and must be between 1 to 50 characters",
      });
    }

    // Validate postal code
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

    // Validate dist
    if (
      validator.isEmpty(district) ||
      !validator.isLength(district, { min: 1, max: 15 })
    ) {
      return res.status(400).json({
        success: false,
        message: "District is required and must be between 1 to 15 characters",
      });
    }

    // Validate state
    if (
      validator.isEmpty(state) ||
      !validator.isLength(state, { min: 1, max: 15 })
    ) {
      return res.status(400).json({
        success: false,
        message: "State is required and must be between 1 to 15 characters",
      });
    }

    // Validate Country
    if (
      validator.isEmpty(country) ||
      !validator.isLength(country, { min: 1, max: 15 })
    ) {
      return res.status(400).json({
        success: false,
        message: "Country is required and must be between 1 to 15 characters",
      });
    }

    // Validate phone number
    if (
      validator.isEmpty(phoneNumber) ||
      !validator.isMobilePhone(phoneNumber, "en-IN")
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number is required and must be a valid Indian phone number",
      });
    }

    // Updated address
    const updatedAddress = await AddressModel.findByIdAndUpdate(
      id,
      {
        houseNo,
        area,
        postalCode,
        district,
        state,
        country,
        phoneNumber,
        landMark,
      },
      { new: true }
    );

    // Check if Address exists
    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Success Response
    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************ DELETE ADDRESS CONTROLLER *************/
export const deleteAddressController = async (req, res) => {
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

    const { addressId } = req.body;

    // Validate address ID
    if (!addressId) {
      return res.status(400).json({
        success: false,
        message: "Address ID is required",
      });
    }

    // Find the address by ID and user ID to ensure the user owns the address
    const address = await AddressModel.findOneAndDelete({
      _id: addressId,
      userId: userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message:
          "Address not found or you do not have permission to delete this address",
      });
    }

    // Success res
    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
