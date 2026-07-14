import jwt from 'jsonwebtoken';
const isAuth = async (req, res, next) => {
  try {
    // 1. Extract the cookie safely
    const token = req.cookies?.token; 

    console.log("--- Middleware Check ---");
    console.log("All Cookies:", req.cookies);
    console.log("Extracted Token:", token);

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided in cookies." });
    }

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Token verification failed." });
    }

    // 3. Attach payload to req.user so the controller can read it
    req.user = decoded; 
    
    next();
  } catch (error) {
    // This will print the exact line and reason for a crash in your terminal
    console.error("CRASH IN ISAUTH MIDDLEWARE:", error);
    
    return res.status(500).json({ 
      success: false, 
      message: "isAuth Middleware Crashed", 
      error: error.message 
    });
  }
};

export default isAuth;