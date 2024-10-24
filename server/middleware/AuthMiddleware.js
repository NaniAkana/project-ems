import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false, error: "Authorization header not provided" });
    }

    const token = authHeader.split(' ')[1]; 

    if (!token) {
      return res.status(401).json({ success: false, error: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY); 

    const user = await User.findById(decoded._id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    req.user = user; // Attach user info to request
    next();
    
  } catch (error) {
    console.error('Error in verifyUser middleware:', error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, error: "Token expired" });
    }

    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export default verifyUser;
