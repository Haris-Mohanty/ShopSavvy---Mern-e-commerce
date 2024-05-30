import UserModel from "../Models/UserModel.js";

//************** GET ALL USERS *****************/
export const getAllUserController = async (req, res) => {
  try {
    const userId = req.user;
    const user = await UserModel.findById(userId);
    console.log(user);

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
