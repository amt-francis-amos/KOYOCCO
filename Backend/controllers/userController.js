import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for admin credentials
        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            // If valid, generate and return a token
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            return res.json({ success: true, message: token });
        } else {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Existing user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bycrpt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { loginAdmin, loginUser };
