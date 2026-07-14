import User from '../models/user.model.js'; // Ensure the path to your User model is correct

export const getCurrentUser = async (req, res) => {
  try {
    console.log("--- Controller Check ---");
    console.log("User data from middleware (req.user):", req.user);

    // Make sure we have the payload from middleware
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized: req.user is undefined." });
    }

    // Look up user by ID. Match whatever key you used in your JWT payload (e.g., _id or id or userId)
    const userId = req.user._id || req.user.id || req.user.userId;
    
    if (!userId) {
      return res.status(400).json({ success: false, message: "No user ID found in token payload." });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found in database." });
    }

    return res.status(200).json(user);

  } catch (error) {
    // This will print the exact database or code crash reason in your terminal
    console.error("CRASH IN CURRENT-USER CONTROLLER:", error);
    
    return res.status(500).json({ 
      success: false, 
      message: "Current-User Controller Crashed", 
      error: error.message 
    });
  }
};