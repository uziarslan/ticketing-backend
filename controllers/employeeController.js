const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
const { mainPage, subPages } = require("../seed/seed");

const verifyCode = async (req, res) => {
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
};

const seedData = async (req, res) => {
  if (!mainPage || !subPages) {
    return res.status(400).json({ error: "Data not found" });
  }
  res.status(200).json({ mainPage, subPages });
};

module.exports = { seedData, verifyCode };
