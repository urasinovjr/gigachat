import type { ChatState, ChatAction } from "../../types";

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "CREATE_CHAT":
      return {
        ...state,
        chats: [action.payload, ...state.chats],
        activeChatId: action.payload.id,
        messages: { ...state.messages, [action.payload.id]: [] },
      };

    case "DELETE_CHAT": {
      const newMessages = { ...state.messages };
      delete newMessages[action.payload];
      return {
        ...state,
        chats: state.chats.filter((c) => c.id !== action.payload),
        messages: newMessages,
        activeChatId: state.activeChatId === action.payload ? null : state.activeChatId,
      };
    }

    case "RENAME_CHAT":
      return {
        ...state,
        chats: state.chats.map((c) =>
          c.id === action.payload.id ? { ...c, title: action.payload.title } : c
        ),
      };

    case "SET_ACTIVE_CHAT":
      return { ...state, activeChatId: action.payload };

    case "ADD_MESSAGE": {
      const { chatId, message } = action.payload;
      const chatMessages = state.messages[chatId] || [];
      return {
        ...state,
        messages: { ...state.messages, [chatId]: [...chatMessages, message] },
      };
    }

    case "UPDATE_MESSAGE": {
      const { chatId, messageId, content } = action.payload;
      const chatMessages = state.messages[chatId] || [];
      return {
        ...state,
        messages: {
          ...state.messages,
          [chatId]: chatMessages.map((m) =>
            m.id === messageId ? { ...m, content } : m
          ),
        },
      };
    }

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
