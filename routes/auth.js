const express = require("express");
const { register, login, getUser } = require("../controllers/auth");
const { protect } = require("../middlewares/authMiddleware");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));
router.get("/user", protect, wrapAsync(getUser));

module.exports = router;
