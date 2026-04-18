const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            const parts = req.headers.authorization.split(" ");
            
            if (parts.length === 2) {
                // ✅ CHANGE THIS LINE:
                token = parts[1]; 
            }
        }

        // 2. Safety check
        if (!token || token === "undefined" || token === "null") {
            return res.status(401).json({ 
                message: "Not authorized: No valid token string provided." 
            });
        }

        // 3. Verify - Now 'token' is a string, so this won't crash!
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = { id: decoded.id };
        next();

    } catch (error) {
        console.error("❌ Auth Middleware Error:", error.message);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};

module.exports = { protect };