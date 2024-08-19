const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        const findEmail = await User.findOne({ email });
        if (!name) throw new Error("Insert your name");
        if (!email) throw new Error("Insert your email");
        if (findEmail) throw new Error("Email already exists!");
        if (!req.body.password) throw new Error("Insert your password");
        if (password.length < 6) throw new Error("Password should be at least 6 characters long");
        if (!confirm_password) throw new Error("Confirm your password");
        if (password !== confirm_password) throw new Error("Passwords do not match");
        next();
    } catch (err) {
        res.status(400).json({
            status: "Registration failed",
            message: err.message
        });
    }
}

module.exports = authMiddleware; // authMiddleware is exported to be used in routes/authRoutes.js