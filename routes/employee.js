const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const { seedData, verifyCode } = require("../controllers/employeeController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/verify-code", wrapAsync(verifyCode));

router.get("/seed", protect, wrapAsync(seedData));

module.exports = router;
