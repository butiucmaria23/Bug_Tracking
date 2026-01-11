const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (roles = []) => {
  if (typeof roles === "string") roles = [roles];

  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "No token" });

    try {
      const token = header.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }
  };
};
