import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
    try {
        // Check for Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, error: "Authorization header missing or malformed" });
        }

        // Extract the token
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, error: "Token not provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (!decoded || !decoded._id) {
            return res.status(401).json({ success: false, error: "Invalid token" });
        }

        // Find the user in the database
        const user = await User.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Attach user to request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in verifyUser middleware:", error.message);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export default verifyUser;
