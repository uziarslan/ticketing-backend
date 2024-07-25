const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: String,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

const ticketSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "opened",
    enum: ["opened", "closed", "processing"],
  },
  rasisedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  comments: [commentSchema],
  closeDate: {
    type: Date,
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
