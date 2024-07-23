const router = require("express").Router();
const user = require("../../db/user");
const conversation = require("../../db/messages/conversation");
const messages = require("../../db/messages/message");
const { io, activeUsers } = require("../../app");

router.get("/users", async (req, res) => {
  const userConversations = await user.find({ _id: { $ne: req.user._id }});

  res.send(userConversations);
});

router.get("/:id", async (req, res) => {
  const conversationCheck = await conversation.exists({ users: { $all: [req.user._id, req.params.id] } });

  if(conversationCheck) {
    const sendConversation = await conversation.findOne({ users: { $all: [req.user._id, req.params.id] } }).populate("messages").populate({ path: "messages", populate: { path: "senderId recieverId" } });

    res.send(sendConversation);
  } else {
    const createConversation = await conversation.create({
      users: [req.user._id, req.params.id]
    }); 

    createConversation.save();

    res.send(createConversation); 
  }
});

router.post("/:id/messages", async (req, res) => {
  const { messageContent } = req.body;

  if(messageContent) {
    const createMessage = await messages.create({
      senderId: req.user._id,
      recieverId: req.params.id,
      message: messageContent
    });
  
    createMessage.save();
  
    await conversation.findOneAndUpdate({ users: { $all: [req.user._id, req.params.id] } }, {
      $push: {
        messages: createMessage._id
      }
    });

    const newMessage = await messages.findById(createMessage._id).populate("senderId recieverId");

    io.to(activeUsers[req.params.id]).emit("message", newMessage);
    
    res.send(newMessage);
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;