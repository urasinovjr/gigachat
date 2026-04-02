import type { Chat, MessageData } from "../types";

const STORAGE_KEY = "gigachat-chats";

interface SavedState {
  chats: Chat[];
  activeChatId: string | null;
  messages: Record<string, MessageData[]>;
}

export function saveChats(
  chats: Chat[],
  activeChatId: string | null,
  messages: Record<string, MessageData[]>
) {
  try {
    const data: SavedState = { chats, activeChatId, messages };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function loadChats(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as SavedState;
    if (!Array.isArray(data.chats) || typeof data.messages !== "object") {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
