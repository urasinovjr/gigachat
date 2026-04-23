import { describe, it, expect } from "vitest";
import { chatReducer } from "./chatReducer";
import { initialState } from "./ChatContext";
import type { ChatState } from "../../types";

describe("chatReducer", () => {
  describe("CREATE_CHAT", () => {
    it("добавляет новый чат и устанавливает его активным", () => {
      const newChat = { id: "1", title: "Тестовый чат", createdAt: "2024-01-01T00:00:00.000Z" };
      const result = chatReducer(initialState, {
        type: "CREATE_CHAT",
        payload: newChat,
      });

      expect(result.chats).toHaveLength(1);
      expect(result.chats[0]).toEqual(newChat);
      expect(result.activeChatId).toBe("1");
      expect(result.messages["1"]).toEqual([]);
    });

    it("добавляет чат в начало массива", () => {
      const state: ChatState = {
        ...initialState,
        chats: [{ id: "old", title: "Старый чат", createdAt: "2024-01-01T00:00:00.000Z" }],
        messages: { old: [] },
      };
      const newChat = { id: "new", title: "Новый чат", createdAt: "2024-01-02T00:00:00.000Z" };
      const result = chatReducer(state, {
        type: "CREATE_CHAT",
        payload: newChat,
      });

      expect(result.chats).toHaveLength(2);
      expect(result.chats[0].id).toBe("new");
      expect(result.chats[1].id).toBe("old");
    });
  });

  describe("DELETE_CHAT", () => {
    it("удаляет чат, сообщения и сбрасывает activeChatId", () => {
      const state: ChatState = {
        ...initialState,
        chats: [{ id: "1", title: "Чат", createdAt: "2024-01-01T00:00:00.000Z" }],
        activeChatId: "1",
        messages: { "1": [{ id: "m1", role: "user", content: "Привет", timestamp: "12:00" }] },
      };
      const result = chatReducer(state, { type: "DELETE_CHAT", payload: "1" });

      expect(result.chats).toHaveLength(0);
      expect(result.messages["1"]).toBeUndefined();
      expect(result.activeChatId).toBeNull();
    });

    it("сохраняет activeChatId при удалении другого чата", () => {
      const state: ChatState = {
        ...initialState,
        chats: [
          { id: "1", title: "Первый", createdAt: "2024-01-01T00:00:00.000Z" },
          { id: "2", title: "Второй", createdAt: "2024-01-02T00:00:00.000Z" },
        ],
        activeChatId: "1",
        messages: { "1": [], "2": [] },
      };
      const result = chatReducer(state, { type: "DELETE_CHAT", payload: "2" });

      expect(result.activeChatId).toBe("1");
      expect(result.chats).toHaveLength(1);
      expect(result.chats[0].id).toBe("1");
    });
  });

  describe("ADD_MESSAGE", () => {
    it("добавляет сообщение в конец массива", () => {
      const state: ChatState = {
        ...initialState,
        chats: [{ id: "1", title: "Чат", createdAt: "2024-01-01T00:00:00.000Z" }],
        messages: { "1": [{ id: "m1", role: "user", content: "Первое", timestamp: "12:00" }] },
      };
      const newMessage = { id: "m2", role: "assistant" as const, content: "Ответ", timestamp: "12:01" };
      const result = chatReducer(state, {
        type: "ADD_MESSAGE",
        payload: { chatId: "1", message: newMessage },
      });

      expect(result.messages["1"]).toHaveLength(2);
      expect(result.messages["1"][1]).toEqual(newMessage);
    });
  });

  describe("RENAME_CHAT", () => {
    it("обновляет название чата по id", () => {
      const state: ChatState = {
        ...initialState,
        chats: [
          { id: "1", title: "Старое название", createdAt: "2024-01-01T00:00:00.000Z" },
          { id: "2", title: "Другой чат", createdAt: "2024-01-02T00:00:00.000Z" },
        ],
      };
      const result = chatReducer(state, {
        type: "RENAME_CHAT",
        payload: { id: "1", title: "Новое название" },
      });

      expect(result.chats[0].title).toBe("Новое название");
      expect(result.chats[1].title).toBe("Другой чат");
    });
  });
});
