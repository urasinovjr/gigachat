import type { SettingsData } from "../types";

export const defaultSettings: SettingsData = {
  model: "GigaChat",
  temperature: 0.7,
  topP: 0.9,
  maxTokens: 1024,
  repetitionPenalty: 1.0,
  systemPrompt: "",
  theme: "light",
};
