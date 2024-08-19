const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const {
  fetchCoat,
  borrowList,
  handleFormSubmit,
} = require("../controllers/phpFetch");
const router = express.Router();

router.get("/fetch/coat/data", wrapAsync(fetchCoat));

router.get("/fetch/borrow/data", wrapAsync(borrowList));

router.post("/submit/rent-a-coat", wrapAsync(handleFormSubmit));

module.exports = router;
