import { describe, it, expect, vi, beforeEach } from "vitest";
import { saveChats, loadChats } from "./storage";

function createLocalStorageMock() {
  const store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach((key) => delete store[key]); },
    get length() { return Object.keys(store).length; },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
}

describe("storage", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", createLocalStorageMock());
  });

  it("saveChats сохраняет данные в localStorage", () => {
    const chats = [{ id: "1", title: "Тест", createdAt: "2024-01-01T00:00:00.000Z" }];
    const messages = { "1": [] };

    saveChats(chats, "1", messages);

    const raw = localStorage.getItem("gigachat-chats");
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed.chats).toEqual(chats);
    expect(parsed.activeChatId).toBe("1");
    expect(parsed.messages).toEqual(messages);
  });

  it("loadChats читает и парсит сохранённые данные", () => {
    const chats = [{ id: "1", title: "Тест", createdAt: "2024-01-01T00:00:00.000Z" }];
    const messages = { "1": [{ id: "m1", role: "user", content: "Привет", timestamp: "12:00" }] };

    saveChats(chats, "1", messages);
    const result = loadChats();

    expect(result).not.toBeNull();
    expect(result!.chats).toEqual(chats);
    expect(result!.activeChatId).toBe("1");
    expect(result!.messages).toEqual(messages);
  });

  it("loadChats возвращает null при отсутствии данных", () => {
    const result = loadChats();
    expect(result).toBeNull();
  });

  it("loadChats возвращает null при невалидном JSON", () => {
    localStorage.setItem("gigachat-chats", "не валидный json{{{");
    const result = loadChats();
    expect(result).toBeNull();
  });

  it("loadChats возвращает null когда chats не массив", () => {
    const bad = { chats: "не массив", activeChatId: null, messages: {} };
    localStorage.setItem("gigachat-chats", JSON.stringify(bad));
    const result = loadChats();
    expect(result).toBeNull();
  });

  it("loadChats возвращает null когда messages не объект", () => {
    const bad = { chats: [], activeChatId: null, messages: "строка" };
    localStorage.setItem("gigachat-chats", JSON.stringify(bad));
    const result = loadChats();
    expect(result).toBeNull();
  });
});
