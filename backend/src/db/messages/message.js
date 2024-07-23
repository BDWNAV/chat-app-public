const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  recieverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("message", messageSchema);