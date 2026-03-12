export interface Chat {
  id: string;
  title: string;
  lastMessageDate: string;
}

export interface MessageData {
  id: string;
  role: "user" | "assistant";
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
