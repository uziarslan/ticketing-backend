const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const adminLogin = async (req, res) => {
  const { username } = req.body;

  const foundAdmin = await Admin.findOne({ username });

  if (foundAdmin) {
    res.json({
      token: generateToken(foundAdmin._id),
    });
  } else {
    res.status(404).json({ error: "Page is not found." });
  }
};

const getAdmin = async (req, res) => {
  const admin = await Admin.findById(req.user.id);
  res.json(admin);
};

module.exports = {
  adminLogin,
  getAdmin,
};
