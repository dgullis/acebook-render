const User = require("../models/user");
const crypto = require("crypto");
const { generateToken } = require("../lib/token");

const createToken = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Hash the password
    const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    const user = await User.findOne({ email: email });
    if (!user) {
        console.log("Auth Error: User not found");
        res.status(401).json({ message: "User not found" });
    } else if (user.password !== hashedPassword) {
        console.log("Auth Error: Passwords do not match");
        res.status(401).json({ message: "Password incorrect" });
    } else {
        const token = generateToken(user.id);
        res.status(201).json({ token: token, message: "OK" });
    }
};

const AuthenticationController = {
    createToken: createToken,
};

module.exports = AuthenticationController;
