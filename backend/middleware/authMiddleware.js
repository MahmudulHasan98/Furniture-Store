import jwt from "jsonwebtoken";
import User from "../models/user.js";

// 1. Middleware to check if user is logged in
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// 2. ADD THIS: Middleware to check if user is an ADMIN
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is admin, proceed to the next function
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};
