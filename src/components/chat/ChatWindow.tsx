import { useState, useRef } from "react";
import { Settings } from "lucide-react";
import type { MessageData } from "../../types";
import MessageList from "./MessageList";
import InputArea from "./InputArea";
import styles from "./ChatWindow.module.css";

interface ChatWindowProps {
  chatTitle: string;
  onOpenSettings: () => void;
}

function ChatWindow({ chatTitle, onOpenSettings }: ChatWindowProps) {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleSend = (text: string) => {
    const now = new Date();
    const time = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");

    const userMessage: MessageData = {
      id: String(Date.now()),
      role: "user",
      content: text,
      timestamp: time,
    };

    setMessages([...messages, userMessage]);
    setIsLoading(true);

    timerRef.current = window.setTimeout(() => {
      const assistantMessage: MessageData = {
        id: String(Date.now()),
        role: "assistant",
        content: "Это моковый ответ от GigaChat. В будущем здесь будет настоящий ответ от API.",
        timestamp: new Date().getHours() + ":" + String(new Date().getMinutes()).padStart(2, "0"),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
      timerRef.current = null;
    }, 1500);
  };

  const handleStop = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>
        <h2 className={styles.chatTitle}>{chatTitle}</h2>
        <button className={styles.settingsButton} onClick={onOpenSettings}>
          <Settings size={20} />
        </button>
      </div>

      <MessageList messages={messages} isTyping={isLoading} />

      <InputArea onSend={handleSend} disabled={isLoading} isLoading={isLoading} onStop={handleStop} />
    </div>
  );
}

export default ChatWindow;
