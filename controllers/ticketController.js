const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
const Ticket = mongoose.model("Ticket");

const createTicket = async (req, res) => {
  const { id } = req.user;

  if (!req.body) {
    return res.status(500).json({ error: "Please fill out the information" });
  }

  const ticket = new Ticket({
    content: req.body,
    raisedBy: id,
  });

  await Employee.findByIdAndUpdate(id, {
    $push: { tickets: ticket._id },
  });

  await ticket.save();
  res.status(200).json({ success: "Ticket has been raised" });
};

const getUserTickets = async (req, res) => {
  const { id } = req.user;

  const employee = await Employee.findById(id).populate("tickets");

  res.status(200).json(employee.tickets);
};

const getAllTickets = async (req, res) => {
  const t = await Ticket.find({});
  const openedTickets = t.filter((ticket) => ticket.status === "opened");
  const tickets = t.filter((ticket) => ticket.status !== "opened");
  res.status(200).json({ openedTickets, tickets });
};

const changeTicketStatus = async (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;

  await Ticket.findByIdAndUpdate(
    ticketId,
    { status: status, closeDate: Date.now() },
    { new: true }
  );

  res.status(200).json({ success: "Ticket Status Changed" });
};

const addComment = async (req, res) => {
  const { ticketId } = req.params;
  const { comment, sender } = req.body;
  let newComment;

  if (!sender) {
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
};

module.exports = {
  createTicket,
  getUserTickets,
  getAllTickets,
  changeTicketStatus,
  addComment,
};
