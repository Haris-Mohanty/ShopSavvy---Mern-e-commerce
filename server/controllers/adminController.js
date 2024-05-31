import UserModel from "../Models/UserModel.js";

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

    const allUsers = await UserModel.find({});

    return res.status(200).json({
      success: true,
      totalUsers: allUsers.length,
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
