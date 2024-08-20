const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const {email, name, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // password is hashed
        const user = new User({
            name,
            email,
            password: hashedPassword // password is hashed
        });
        await user.save(); // user is saved in the database
        res.status(200).json({
            message: "User created successfully"
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        // Create a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log(token);
        res.status(200).json({
            status: "Login Successful",
            token
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        });
    }
};

module.exports = {register, login};