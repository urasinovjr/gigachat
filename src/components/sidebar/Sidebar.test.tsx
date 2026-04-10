import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ChatContext } from "../../app/providers/ChatContext";
import type { ChatState, ChatAction } from "../../types";
import Sidebar from "./Sidebar";

const mockState: ChatState = {
  chats: [
    { id: "1", title: "Первый чат", createdAt: "2024-01-01T00:00:00.000Z" },
    { id: "2", title: "Второй чат", createdAt: "2024-01-02T00:00:00.000Z" },
  ],
  activeChatId: "1",
  messages: {
    "1": [{ id: "m1", role: "user", content: "Привет", timestamp: "12:00" }],
    "2": [],
  },
  isLoading: false,
  error: null,
};

function renderSidebar(state: ChatState = mockState, dispatch: React.Dispatch<ChatAction> = vi.fn()) {
  return render(
    <MemoryRouter>
      <ChatContext.Provider value={{ state, dispatch }}>
        <Sidebar isOpen={true} onClose={vi.fn()} />
      </ChatContext.Provider>
    </MemoryRouter>
  );
}

describe("Sidebar", () => {
  it("показывает все чаты при пустом поиске", () => {
    renderSidebar();

    expect(screen.getByText("Первый чат")).toBeInTheDocument();
    expect(screen.getByText("Второй чат")).toBeInTheDocument();
  });

  it("фильтрует чаты по названию при вводе в поиск", async () => {
    const user = userEvent.setup();
    renderSidebar();

    const search = screen.getByPlaceholderText("Поиск чатов…");
    await user.type(search, "Первый");

    expect(screen.getByText("Первый чат")).toBeInTheDocument();
    expect(screen.queryByText("Второй чат")).not.toBeInTheDocument();
  });

  it("показывает запрос на подтверждение при удалении чата", async () => {
    const user = userEvent.setup();
    window.confirm = vi.fn().mockReturnValue(false);
    const { container } = renderSidebar();

    const actionsContainers = container.querySelectorAll(".actions");
    const deleteButton = actionsContainers[0].querySelectorAll("button")[1];
    await user.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith("Удалить этот чат?");
  });
});
