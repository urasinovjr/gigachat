import { createContext, useContext } from "react";
import type { ChatState, ChatAction } from "../../types";

export const initialState: ChatState = {
  chats: [],
  activeChatId: null,
  messages: {},
  isLoading: false,
  error: null,
};

interface ChatContextValue {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
}

export const ChatContext = createContext<ChatContextValue>({
  state: initialState,
  dispatch: () => {},
});

export function useChatContext() {
  return useContext(ChatContext);
}
