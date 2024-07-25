const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");
const jwt = require("jsonwebtoken");
const { MailtrapClient } = require("mailtrap");

const jwt_secret = process.env.jwt_secret;
const router = express.Router();

// router.post(
//   "/admin/register",
//   wrapAsync(async (req, res) => {
//     const { username } = req.body;

//     const admin = new Admin({
//       username,
//     });

//     await admin.save();
//   })
// );

router.post(
  "/admin/login",
  wrapAsync(async (req, res) => {
    const { username } = req.body;

    const foundAdmin = await Admin.findOne({ username });

    if (foundAdmin) {
      req.login(foundAdmin, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err.message });
        }

        const token = jwt.sign({ id: foundAdmin._id }, jwt_secret, {
          expiresIn: "22h",
        });

        return res.status(200).json({
          token,
          userId: foundAdmin._id,
          user: foundAdmin,
        });
      });
    }
  })
);

module.exports = router;
