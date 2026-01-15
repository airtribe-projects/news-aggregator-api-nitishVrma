const jwt = require("jsonwebtoken");
require("dotenv").config();

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ message: "Authentication token required." });
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Authentication token expired." });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid authentication token." });
    } else {
      return res.status(500).json({ message: "Failed to authenticate token." });
    }
  }
}

module.exports = authMiddleware;
