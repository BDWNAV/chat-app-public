import { create } from "zustand";

export const useConversationStore = create((set) => ({
  conversation: null,
  setConversation: (conversation) => set({ conversation }),
  messages: [],
  setMessages: (messages) => set({ messages })
}));
