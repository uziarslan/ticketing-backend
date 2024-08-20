const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const {
  fetchCoat,
  borrowList,
  handleFormSubmit,
  askQuestion,
} = require("../controllers/phpFetch");
const router = express.Router();

router.get("/fetch/coat/data", wrapAsync(fetchCoat));

router.get("/fetch/borrow/data", wrapAsync(borrowList));

router.post("/submit/rent-a-coat", wrapAsync(handleFormSubmit));

router.post("/submit-question", wrapAsync(askQuestion));

module.exports = router;
