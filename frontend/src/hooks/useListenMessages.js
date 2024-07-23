import { useEffect, useContext } from "react";
import { SocketContext } from "@/app/page";
import { AuthContext } from "@/app/page";
import { useConversationStore } from "@/utils/setConversation";

export const useListenMessages = () => {
  const socket = useContext(SocketContext);
  const user = useContext(AuthContext);
  const { conversation, messages, setMessages } = useConversationStore();
  
  useEffect(() => {
    socket?.on("message", async (msg) => {
      console.log(conversation + " " + msg.senderId._id);

      setMessages([...messages, msg]); 
    }, [socket, conversation, messages]);
  });
}