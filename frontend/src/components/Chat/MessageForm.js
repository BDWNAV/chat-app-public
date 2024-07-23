"use client";
import { useState } from "react";
import { useConversationStore } from "@/utils/setConversation"
import { RiSendPlaneFill } from "react-icons/ri";
import axios from "axios";
import url from "@/utils/urls";

export default function MessageForm() {
  const { conversation, messages, setMessages } = useConversationStore();
  const [userMessage, setUserMessage] = useState("");


  return (
    <form className="flex flex-row border-2 rounded-md mt-4" onSubmit={((e) => {
      e.preventDefault();
    
      if(conversation === null) {
        return;
      } else {
        if(!userMessage) {
          return;
        } else {
          axios.post(`${url}/api/conversations/${conversation}/messages`, {
            messageContent: userMessage
          }, { withCredentials: true }).then((response) => {
            setMessages([...messages, response.data]);
          }).catch((err) => {
            console.log(err);
          });
          
          setUserMessage("");
        }
      }
    })}>
      <input type="text" className="w-full p-2.5 rounded-md text-lg outline-none" placeholder="Enter a message" value={userMessage} onChange={((e) => setUserMessage(e.target.value))} >
      </input>
      <button type="submit" className="ms-3 me-3 flex items-center justify-center">
        <RiSendPlaneFill></RiSendPlaneFill>
      </button>
    </form>
  )
}