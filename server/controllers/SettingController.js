import User from "../models/User.js";
import bcrypt from 'bcrypt';

const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, error: "User not found" });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password); // Compare with the stored password
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Wrong old password" });
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, { password: hashPassword }); // No need to use an object for findByIdAndUpdate
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Setting error" });
    }
};

export { changePassword };
