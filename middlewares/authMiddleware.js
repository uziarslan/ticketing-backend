const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
const Admin = mongoose.model("Admin");
const dotenv = require("dotenv");

dotenv.config();

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.jwt_secret);

      let user = await Employee.findById(decoded.id);

      if (!user) {
        user = await Admin.findById(decoded.id);
      }

      if (!user) {
        return res.status(404).json({ Error: "User not found!" });
      }

      req.user = user;

      next();
    } catch (ex) {
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
