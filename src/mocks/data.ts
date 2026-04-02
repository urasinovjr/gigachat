import type { SettingsData } from "../types";

export const defaultSettings: SettingsData = {
  model: "GigaChat",
  temperature: 0.7,
  topP: 0.9,
  maxTokens: 1024,
  systemPrompt: "",
  theme: "light",
};
