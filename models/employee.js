const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const employeeSchema = new mongoose.Schema({
  username: String,
  role: {
    type: String,
    default: "Employee",
  },
  code: String,
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
});

employeeSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Employee", employeeSchema);
