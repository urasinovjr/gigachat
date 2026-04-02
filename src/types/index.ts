export interface Chat {
  id: string;
  title: string;
  createdAt: string;
}

export interface MessageData {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export type ModelName = "GigaChat" | "GigaChat-Plus" | "GigaChat-Pro" | "GigaChat-Max";

export interface SettingsData {
  model: ModelName;
  temperature: number;
  topP: number;
  maxTokens: number;
  systemPrompt: string;
  theme: "light" | "dark";
}

export interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  messages: Record<string, MessageData[]>;
  isLoading: boolean;
  error: string | null;
}

export type ChatAction =
  | { type: "CREATE_CHAT"; payload: Chat }
  | { type: "DELETE_CHAT"; payload: string }
  | { type: "RENAME_CHAT"; payload: { id: string; title: string } }
  | { type: "SET_ACTIVE_CHAT"; payload: string | null }
  | { type: "ADD_MESSAGE"; payload: { chatId: string; message: MessageData } }
  | { type: "UPDATE_MESSAGE"; payload: { chatId: string; messageId: string; content: string } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };
