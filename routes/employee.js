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

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

router.post(
  "/register",
  wrapAsync(async (req, res) => {
    const { username } = req.body;

    const snitize = username.split("@")[1];

    // if (snitize !== "nyu.edu") {
    //   return res.status(401).json({ error: "You are not authorized" });
    // }

    const otp = generateOTP();

    if (!username) {
      return res.status(400).json({ error: "Please enter username." });
    }

    const foundEmployee = await Employee.findOne({ username });

    if (foundEmployee) {
      foundEmployee.code = otp;
      await foundEmployee.save();

      client.send({
        from: sender,
        to: [{ email: foundEmployee.username }],
        template_uuid: "83cbc93f-4b52-4557-a450-d03a0e1b01f0",
        template_variables: {
          otp: otp,
        },
      });

      return res.status(200).json({ success: "Registered" });
    } else {
      const employee = new Employee({
        username,
        code: otp,
      });

      await employee.save();

      client.send({
        from: sender,
        to: [{ email: foundEmployee.username }],
        template_uuid: "83cbc93f-4b52-4557-a450-d03a0e1b01f0",
        template_variables: {
          otp: otp,
        },
      });

      return res.status(200).json({ success: "Registered" });
    }
  })
);

router.post(
  "/login",
  wrapAsync(async (req, res) => {
    const { username } = req.body;

    const foundEmployee = await Employee.findOne({ username });

    if (foundEmployee) {
      req.login(foundEmployee, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err.message });
        }

        const token = jwt.sign({ id: foundEmployee._id }, jwt_secret, {
          expiresIn: "22h",
        });

        foundEmployee.code = "";
        foundEmployee.save();

        return res.status(200).json({
          token,
          userId: foundEmployee._id,
          user: foundEmployee,
        });
      });
    }
  })
);

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

router.get("/api/auth/current_user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "User not authenticated" });
  }
});

module.exports = router;
