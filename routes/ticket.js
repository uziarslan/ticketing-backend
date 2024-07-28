const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const { protect } = require("../middlewares/authMiddleware");
const {
  createTicket,
  getUserTickets,
  getAllTickets,
  changeTicketStatus,
  addComment,
} = require("../controllers/ticketController");

const router = express.Router();

router.post("/create-ticket", protect, wrapAsync(createTicket));
router.get("/get-user-tickets", protect, wrapAsync(getUserTickets));
router.get("/get-all-tickets", protect, wrapAsync(getAllTickets));
router.post("/change/:ticketId", protect, wrapAsync(changeTicketStatus));
router.post("/add-comment/:ticketId", protect, wrapAsync(addComment));

module.exports = router;
