const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
const Ticket = mongoose.model("Ticket");
const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAIL_TRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_END_POINT;
const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });
const sender = {
  email: "info@wassermancenter.com",
  name: "Wasserman",
};

const createTicket = async (req, res) => {
  const { id } = req.user;

  if (!req.body) {
    return res.status(500).json({ error: "Please fill out the information" });
  }

  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}${currentDate.getFullYear()}`;

  const ticketCountResult = await Ticket.aggregate([
    {
      $match: {
        _id: { $regex: `^${formattedDate}` },
      },
    },
    {
      $count: "count",
    },
  ]);

  const ticketCount = ticketCountResult.length ? ticketCountResult[0].count : 0;

  const customId = `${formattedDate}${String(ticketCount + 1).padStart(
    2,
    "0"
  )}`;

  const ticket = new Ticket({
    _id: customId,
    content: req.body,
    raisedBy: id,
  });

  await Employee.findByIdAndUpdate(id, {
    $push: { tickets: ticket._id },
  });

  await ticket.save();

  client.send({
    from: sender,
    to: [{ email: "wassertech-group@nyu.edu" }],
    template_uuid: "f81e7006-270f-4a0a-a54e-962c7ef80a9a",
    template_variables: {
      ticket: ticket,
    },
  });

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
  const { status, assignedTo } = req.body;

  let ticket;

  if (assignedTo) {
    ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { status: status, closeDate: Date.now(), assignedTo: assignedTo },
      { new: true }
    ).populate("raisedBy");

    client.send({
      from: sender,
      to: [{ email: ticket.raisedBy.username }],
      template_uuid: "9239666e-881b-4d97-87d5-8385cd63666f",
      template_variables: {
        ticket: ticket,
        username: ticket.raisedBy.username,
      },
    });
  } else {
    ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { status: status, closeDate: Date.now() },
      { new: true }
    ).populate("raisedBy");
  }

  if (status === "closed") {
    client.send({
      from: sender,
      to: [{ email: ticket.raisedBy.username }],
      template_uuid: "197bacf3-9130-4b8e-a259-cd33d25e2908",
      template_variables: {
        ticket: ticket,
        username: ticket.raisedBy.username,
      },
    });
  }
  res.status(200).json({ success: "Ticket Status Changed" });
};

const addComment = async (req, res) => {
  const { ticketId } = req.params;
  const { comment, senderId } = req.body;
  let newComment;

  if (!senderId) {
    newComment = {
      comment: comment.trim(),
    };
  } else {
    newComment = {
      comment: comment.trim(),
      sender: senderId,
    };
  }

  const newticket = await Ticket.findByIdAndUpdate(
    ticketId,
    { $push: { comments: newComment } },
    { new: true }
  ).populate("raisedBy");

  if (!senderId) {
    client.send({
      from: sender,
      to: [{ email: newticket.raisedBy.username }],
      template_uuid: "f049a5db-1cd4-4444-976e-c1639182fa37",
      template_variables: {
        ticket: newticket,
        comment: comment,
      },
    });
  } else {
    client.send({
      from: sender,
      to: [{ email: "wassertech-group@nyu.edu" }],
      template_uuid: "f049a5db-1cd4-4444-976e-c1639182fa37",
      template_variables: {
        ticket: newticket,
        comment: comment,
      },
    });
  }

  res.status(200).json(newticket);
};

module.exports = {
  createTicket,
  getUserTickets,
  getAllTickets,
  changeTicketStatus,
  addComment,
};
