const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Check if the secret exists
        if (!process.env.JWT_SECRET) {
            console.error("❌ CRITICAL ERROR: JWT_SECRET is not defined in .env");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        
        // 2. Sign the token
        const token = jwt.sign(
            { id: newUser._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );
        
        console.log("✅ User created and token signed for:", email);

        res.status(201).json({ 
            token, 
            user: { 
                id: newUser._id,
                username: newUser.username, 
                email: newUser.email, 
                watchlist: [] 
            } 
        });
    } catch (err) {
        console.error("❌ Registration Error:", err.message);
        res.status(400).json({ message: err.message });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        // 2. Compare entered password with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        // 3. Create JWT Token
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        // 4. Send back user data (excluding password) and token
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                watchlist: user.watchlist
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getWatchlist = async (req, res) => {
    try {
        // Find user and "populate" the watchlist field with full anime data
        const user = await User.findById(req.user.id).populate("watchlist");
        
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user.watchlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Also add a Remove route
exports.removeFromWatchlist = async (req, res) => {
    try {
        const { animeId } = req.params;
        const user = await User.findById(req.user.id);
        
        user.watchlist = user.watchlist.filter(id => id.toString() !== animeId);
        await user.save();
        
        res.status(200).json({ message: "Removed from watchlist" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};