import Message from "./Message";
import { useConversationStore } from "@/utils/setConversation";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "@/app/page"
import { useListenMessages } from "@/hooks/useListenMessages";
import axios from "axios";
import url from "@/utils/urls";
import MessageForm from "./MessageForm";
import MessageSkeleton from "../skeletons/MessageSkeleton";

export default function ChatContainer() {
  const { conversation, messages, setMessages } = useConversationStore();
  const user = useContext(AuthContext);
  const messageRef = useRef(null);
  const [loading, setLoading] = useState(true);
  useListenMessages();

  useEffect(() => {
    if(conversation === null) {
      return;
    } else {
      axios.get(`${url}/api/conversations/${conversation}/`, { withCredentials: true }).then((response) => {
        if(response.data.messages.length === 0) {
          setMessages([]);
          setLoading(false);
        } else {
          setMessages(response.data.messages); 
          setLoading(false);
        }
      }).catch((err) => {
        console.log(err);
        setLoading(true);
      }); 
    }
  }, [conversation]);

  useEffect(() => {
    setTimeout(() => {
      messageRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, 100);
  });

  /*
        {!messages.length || conversation === null ? <div className="flex-1 flex flex-col"><h1 className="text-center text-2xl font-semibold">Please select a conversation to get started or send a message.</h1></div> : 
        <div className="overflow-y-auto p-1">
          {messages.map((message) => {
            const userCheck = user._id === message.senderId._id ? true : false;
            const profilePicture = user._id === message.senderId._id ? user.profileUrl : message.senderId.profileUrl;
            
            return <Message key={message._id} content={message.message} fromUser={userCheck} profileUrl={profilePicture} ref={messageRef}></Message>;
          })}
        </div>
      }
  */

  if(conversation === null) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-2xl font-semibold">Please select a conversation to get started.</h1>
      </div>
    )
  } else if (loading) {
    return (
      <div className="flex flex-col flex-1 justify-end p-2 h-screen">
        <MessageSkeleton fromUser={false}></MessageSkeleton>
        <MessageSkeleton fromUser={true}></MessageSkeleton>
        <MessageSkeleton fromUser={false}></MessageSkeleton>
        <MessageSkeleton fromUser={true}></MessageSkeleton>

        <MessageForm></MessageForm>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col flex-1 justify-end p-2 h-screen">
        <div className="overflow-y-auto p-1">
          {!messages.length ? <div className="text-center"><h1 className="text-2xl font-semibold">Hello {user.displayName} send a message to get started.</h1></div> : messages.map((message) => {
            const userCheck = user._id === message.senderId._id ? true : false;
            const profilePicture = user._id === message.senderId._id ? user.profileUrl : message.senderId.profileUrl;

            return <Message key={message._id} content={message.message} fromUser={userCheck} profileUrl={profilePicture} ref={messageRef}></Message>;
          })}
        </div>

        <MessageForm></MessageForm>
      </div>
    )
  }
}