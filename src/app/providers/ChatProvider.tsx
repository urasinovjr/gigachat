import { useReducer, useEffect } from "react";
import { saveChats, loadChats } from "../../utils/storage";
import { ChatContext, initialState } from "./ChatContext";
import { chatReducer } from "./chatReducer";

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState, () => {
    const saved = loadChats();
    if (saved) {
      return {
        ...initialState,
        chats: saved.chats,
        activeChatId: saved.activeChatId,
        messages: saved.messages,
      };
    }
    return initialState;
  });

  useEffect(() => {
    saveChats(state.chats, state.activeChatId, state.messages);
  }, [state.chats, state.activeChatId, state.messages]);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}
