import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Message from "./Message";

vi.mock("react-markdown", () => ({
  default: ({ children }: { children: string }) => <p>{children}</p>,
}));

vi.mock("rehype-highlight", () => ({
  default: {},
}));

const writeTextMock = vi.fn().mockResolvedValue(undefined);

describe("Message", () => {
  beforeEach(() => {
    writeTextMock.mockClear();
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    });
  });

  it("рендерит сообщение пользователя с CSS-классом messageUser", () => {
    const { container } = render(<Message role="user" content="Привет" timestamp="12:00" />);

    expect(screen.getByText("Привет")).toBeInTheDocument();
    expect(screen.getByText("Вы")).toBeInTheDocument();

    const messageDiv = container.firstChild as HTMLElement;
    expect(messageDiv.className).toContain("messageUser");
  });

  it("рендерит сообщение ассистента с CSS-классом messageAssistant и кнопкой Копировать", () => {
    const { container } = render(<Message role="assistant" content="Ответ" timestamp="12:01" />);

    expect(screen.getByText("Ответ")).toBeInTheDocument();
    expect(screen.getByText("GigaChat")).toBeInTheDocument();
    expect(screen.getByText("Копировать")).toBeInTheDocument();

    const messageDiv = container.firstChild as HTMLElement;
    expect(messageDiv.className).toContain("messageAssistant");
  });

  it("не рендерит сообщение с ролью system", () => {
    const { container } = render(<Message role="system" content="системное" timestamp="12:00" />);
    expect(container.innerHTML).toBe("");
  });

  it("кнопка Копировать отсутствует для сообщений пользователя", () => {
    render(<Message role="user" content="Привет" timestamp="12:00" />);
    expect(screen.queryByText("Копировать")).not.toBeInTheDocument();
  });

  it("копирует текст в буфер при клике на Копировать", () => {
    render(<Message role="assistant" content="Скопируй меня" timestamp="12:00" />);

    fireEvent.click(screen.getByText("Копировать"));

    expect(writeTextMock).toHaveBeenCalledWith("Скопируй меня");
  });
});
