const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
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