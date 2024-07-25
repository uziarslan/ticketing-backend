const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
const Ticket = mongoose.model("Ticket");
const { MailtrapClient } = require("mailtrap");
const { mainPage, subPages } = require("../seed/seed");

const router = express.Router();

const TOKEN = process.env.MAIL_TRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_END_POINT;
const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });
const sender = {
  email: "info@bigtristate.com",
  name: "NYU",
};

router.post(
  "/create-ticket",
  wrapAsync(async (req, res) => {
    const { _id } = req.user;

    if (!req.body) {
      return res.status(500).json({ error: "Please fill out the information" });
    }

    const ticket = new Ticket({
      content: req.body,
      raisedBy: _id,
    });

    await Employee.findByIdAndUpdate(_id, {
      $push: { tickets: ticket._id },
    });

    await ticket.save();
    res.status(200).json({ success: "Ticket has been raised" });
  })
);

router.get(
  "/get-user-tickets",
  wrapAsync(async (req, res) => {
    const { _id } = req.user;

    const employee = await Employee.findById(_id).populate("tickets");

    res.status(200).json(employee.tickets);
  })
);

router.get(
  "/get-all-tickets",
  wrapAsync(async (req, res) => {
    const t = await Ticket.find({});
    const openedTickets = t.filter((ticket) => ticket.status === "opened");
    const tickets = t.filter((ticket) => ticket.status !== "opened");
    res.status(200).json({ openedTickets, tickets });
  })
);

router.post(
  "/change/:ticketId",
  wrapAsync(async (req, res) => {
    const { ticketId } = req.params;
    const { status } = req.body;

    await Ticket.findByIdAndUpdate(
      ticketId,
      { status: status, closeDate: Date.now() },
      { new: true }
    );

    res.status(200).json({ success: "Ticket Status Changed" });
  })
);

router.post(
  "/add-comment/:ticketId",
  wrapAsync(async (req, res) => {
    const { ticketId } = req.params;
    const { comment, sender } = req.body;
    let newComment;

    if (sender === null) {
      newComment = {
        comment: comment.trim(),
      };
    } else {
      newComment = {
        comment: comment.trim(),
        sender: sender,
      };
    }

    const newticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { $push: { comments: newComment } },
      { new: true }
    );

    res.status(200).json(newticket);
  })
);

module.exports = router;
