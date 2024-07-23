"use client";
import { useConversationStore } from "@/utils/setConversation";
import { useRef, useState } from "react";

export default function UserCard({ conversationId, displayName, profileUrl }) {
  const { conversation, setConversation } = useConversationStore();

  return (
    <div className="flex flex-row gap-2 items-center p-3 hover:bg-neutral-200 transition-all cursor-pointer rounded-md" onClick={(() => {
      setConversation(conversationId);

      })}>
      <img src={profileUrl} className="h-6 w-6 rounded-full"></img>
      <p className="font-semibold">{displayName}</p>
    </div>
  )
}