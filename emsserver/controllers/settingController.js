import User from "../models/User.js"
import bcrypt from 'bcrypt'


// const changePassword = async (req, res) => {
//     try {
//         const { userId, oldPassword, newPassword } = req.body


//         if (newPassword !== confirmPassword) {
//             return res.status(400).json({
//                 success: false,
//                 error: "New password and confirm password do not match",
//             });
//         }

//         const user = await User.findById({ _id: userId })
//         if (!user) {
//             return res.status(404).json({ success: false, error: "user not found" })

//         }

//         const isMatch = await bcrypt.compare(oldPassword, user.password)
//         if (!isMatch) {
//             return res.status(404).json({ success: false, error: "wrong old password" })
//         }

//         const hashPassword = await bcrypt.hash(newPassword, 10)

//         const newUser = await User.findByIdAndUpdate({ _id: userId }, { password: hashPassword })

//         return res.status(200).json({ success: true })
//     } catch (error) {

//         return res.status(500).json({ success: false, error: "setting error" })
//     }
// }

const changePassword = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { userId, oldPassword, newPassword } = req.body;

        if (!userId || !oldPassword || !newPassword) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Incorrect old password" });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate({ _id: userId }, { password: hashPassword });

        return res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        console.error("Change Password Error:", error); // Debug server error
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


export { changePassword }