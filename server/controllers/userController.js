// ******************** REGISTER USER ***************/
export const registerUser = async (req, res) => {
  try {
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
