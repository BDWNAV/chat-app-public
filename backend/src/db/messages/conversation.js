const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user"
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "message" 
    }
  ]
});

module.exports = mongoose.model("conversations", conversationSchema); 