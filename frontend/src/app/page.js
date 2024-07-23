"use client";
import ChatContainer from "@/components/Chat/ChatContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import url from "@/utils/urls";

export const AuthContext = createContext(null);
export const SocketContext = createContext(null);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);

  const userInfo = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${url}/api/auth/google/info`, { withCredentials: true }).then((response) => {
      setUser(response.data);
      setLoading(false)
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    if(user) {
      const socket = io(`${url}/`, { withCredentials: true, query: { userId: user._id }});

      socket.on("connect", () => {
        console.log("Connected");
      });

      setSocket(socket);
    } else {
      return;
    }
  }, [user]);

  if(loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <img src="loading-icon.svg" className="h-20 w-20 animate-spin"></img>
      </div>
    )
  } else {
    return (
      <AuthContext.Provider value={user}>
        <SocketContext.Provider value={socket}>
          <main className="flex flex-row min-h-screen">
            <Sidebar></Sidebar>
            <ChatContainer></ChatContainer>
          </main>
        </SocketContext.Provider>
      </AuthContext.Provider>
    )
  }
}
