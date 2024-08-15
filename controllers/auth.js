const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAIL_TRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_END_POINT;
const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });
const sender = {
  email: "info@wassermancenter.com",
  name: "Wasserman",
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Register user
exports.register = async (req, res) => {
  const { username } = req.body;
  const otp = generateOTP();

  if (!username) {
    return res.status(400).json({ error: "Please enter username." });
  }

  // const requiredEmail = username.split("@")[1];

  // if (requiredEmail !== "nyu.edu") {
  //   return res.status(400).json({ error: "Unauthorized" });
  // }

  const foundEmployee = await Employee.findOne({ username });

  if (foundEmployee) {
    foundEmployee.code = otp;
    await foundEmployee.save();

    client.send({
      from: sender,
      to: [{ email: foundEmployee.username }],
      template_uuid: "ce4d822b-3d54-4cbd-b647-6e174c681907",
      template_variables: {
        otp: otp,
      },
    });

    return res.status(201).json({
      _id: foundEmployee._id,
      name: foundEmployee.name,
      email: foundEmployee.email,
      token: generateToken(foundEmployee._id),
    });
  } else {
    const employee = new Employee({
      username,
      code: otp,
    });

    await employee.save();

    client.send({
      from: sender,
      to: [{ email: employee.username }],
      template_uuid: "ce4d822b-3d54-4cbd-b647-6e174c681907",
      template_variables: {
        otp: otp,
      },
    });

    return res.status(201).json({
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      token: generateToken(employee._id),
    });
  }
};

// Login user
exports.login = async (req, res) => {
  const { username } = req.body;

  try {
    const employee = await Employee.findOne({ username });

    if (employee) {
      res.json({
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        token: generateToken(employee._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get user info
exports.getUser = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
