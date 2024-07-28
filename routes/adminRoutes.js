const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const mongoose = require("mongoose");
const { adminLogin, getAdmin } = require("../controllers/adminController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/admin/login", wrapAsync(adminLogin));
router.get("/admin", protect, wrapAsync(getAdmin));

module.exports = router;
