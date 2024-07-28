const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
const jwt = require("jsonwebtoken");
const { MailtrapClient } = require("mailtrap");
const { mainPage, subPages } = require("../seed/seed");

const jwt_secret = process.env.jwt_secret;
const router = express.Router();

const TOKEN = process.env.MAIL_TRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_END_POINT;
const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });
const sender = {
  email: "info@bigtristate.com",
  name: "NYU",
};

router.post(
  "/verify-code",
  wrapAsync(async (req, res) => {
    const { otp, username } = req.body;

    const employee = await Employee.findOne({ username });

    if (!employee || !employee.code) {
      return res.status(500).json({ error: "Incorrect user or no code found" });
    }

    if (employee.code !== otp) {
      return res.status(500).json({ error: "Incorrect Code" });
    }

    if (employee.code === otp) {
      return res.status(200).json({ callBack: "/employeeportal" });
    }
  })
);

router.get(
  "/seed",
  wrapAsync(async (req, res) => {
    res.json({ mainPage, subPages });
  })
);

module.exports = router;
