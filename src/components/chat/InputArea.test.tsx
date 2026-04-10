import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputArea from "./InputArea";

function getSendButton() {
  const buttons = screen.getAllByRole("button");
  return buttons.find((b) => !b.hasAttribute("title"))!;
}

describe("InputArea", () => {
  it("вызывает onSend с текстом при клике на кнопку отправки", async () => {
    const onSend = vi.fn();
    const user = userEvent.setup();
    render(<InputArea onSend={onSend} />);

    const textarea = screen.getByPlaceholderText("Введите сообщение...");
    await user.type(textarea, "Привет");
    await user.click(getSendButton());

    expect(onSend).toHaveBeenCalledWith("Привет");
  });

  it("вызывает onSend при нажатии Enter", async () => {
    const onSend = vi.fn();
    const user = userEvent.setup();
    render(<InputArea onSend={onSend} />);

    const textarea = screen.getByPlaceholderText("Введите сообщение...");
    await user.type(textarea, "Тест{Enter}");

    expect(onSend).toHaveBeenCalledWith("Тест");
  });

  it("кнопка отправки заблокирована при пустом поле", () => {
    render(<InputArea onSend={vi.fn()} />);

    const sendButton = getSendButton();
    expect(sendButton).toBeDisabled();
  });

  it("не вызывает onSend при Shift+Enter", async () => {
    const onSend = vi.fn();
    const user = userEvent.setup();
    render(<InputArea onSend={onSend} />);

    const textarea = screen.getByPlaceholderText("Введите сообщение...");
    await user.type(textarea, "Тест");
    await user.keyboard("{Shift>}{Enter}{/Shift}");

    expect(onSend).not.toHaveBeenCalled();
  });

  it("показывает кнопку Стоп при isLoading", () => {
    const onStop = vi.fn();
    render(<InputArea onSend={vi.fn()} isLoading={true} onStop={onStop} />);

    const buttons = screen.getAllByRole("button");
    const nonAttachButtons = buttons.filter((b) => !b.hasAttribute("title"));
    expect(nonAttachButtons).toHaveLength(1);
    expect(nonAttachButtons[0]).not.toBeDisabled();
  });
});
