import jwt from 'jsonwebtoken'
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(404).json({ success: false, error: "token not provided" })
        }

        const decoded = await jwt.verify(token, process.env.JWT_KEY)
        if (!decoded) {
            return res.status(404).json({ success: false, error: "token not valid" })
        }
        const user = await User.findById({ _id: decoded._id }).select('-password')

        if (!user) {
            return res.status(404).json({ success: false, error: "user not found" })
        }

        req.user = user

        next()
    } catch (error) {
        return res.status(404).json({ success: false, error: "serverside error" })
    }
}

export default verifyUser