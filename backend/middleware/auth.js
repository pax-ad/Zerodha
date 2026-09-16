const jwt = require("jsonwebtoken");

// Fallback to a development key if JWT_SECRET is not set in .env
const JWT_SECRET = process.env.JWT_SECRET || "mydefaultsecretkey123";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Access denied. Missing or malformed authorization header.",
    });
  }

  const token = authHeader.split(" ")[1]?.trim();

  if (!token) {
    return res.status(401).json({
      error: "Access denied. Token missing after Bearer prefix.",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired. Re-authenticate." });
    }
    return res.status(403).json({ error: "Invalid token payload or signature." });
  }
};

module.exports = authMiddleware;