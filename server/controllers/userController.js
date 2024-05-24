import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import UserModel from "../Models/UserModel.js";

// ******************** REGISTER USER ***************/
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, profilePhoto } = req.body;

    // Validation
    if (!name || !email || !password || !profilePhoto) {
      return res.status(422).json({
        success: false,
        message: "Please provide all fields!",
      });
    }

    // Name Validation
    if (!validator.isLength(name, { min: 3, max: 40 })) {
      return res.status(422).json({
        success: false,
        message: "Name must be between 3 and 40 characters long!",
      });
    }

    // Email Validation
    if (!validator.isEmail(email)) {
      return res.status(422).json({
        success: false,
        message: "Please provide a valid email address!",
      });
    }

    // Password validation
    if (!validator.isLength(password, { min: 6 })) {
      return res.status(422).json({
        success: false,
        message: "Password must be at least 6 characters long!",
      });
    }

    // Profile photo validation
    if (!validator.isURL(profilePhoto)) {
      return res.status(422).json({
        success: false,
        message: "Please provide a valid URL for the profile photo!",
      });
    }

    // Check existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Register user
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      profilePhoto,
    });
    await user.save();
    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

// ******************** LOGIN USER ***************/
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(422).json({
        success: false,
        message: "Please provide all fields!",
      });
    }

    // Email Validation
    if (!validator.isEmail(email)) {
      return res.status(422).json({
        success: false,
        message: "Please provide a valid email address!",
      });
    }

    // Password validation
    if (!validator.isLength(password, { min: 6 })) {
      return res.status(422).json({
        success: false,
        message: "Password must be at least 6 characters long!",
      });
    }

    // Get the user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Password Compare
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password, Please check again...",
      });
    }

    // Generate Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Login Success
    return res.status(200).json({
      success: true,
      user,
      token
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
