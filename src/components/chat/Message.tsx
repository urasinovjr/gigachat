import ReactMarkdown from "react-markdown";
import { Bot, Copy } from "lucide-react";
import styles from "./Message.module.css";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

function Message({ role, content, timestamp }: MessageProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert("Скопировано!");
  };

  return (
    <div className={`${styles.message} ${role === "user" ? styles.messageUser : styles.messageAssistant}`}>
      {role === "assistant" && (
        <div className={styles.avatar}>
          <Bot size={20} />
        </div>
      )}

      <div className={styles.bubble}>
        <div className={styles.header}>
          <span className={styles.roleName}>{role === "user" ? "Вы" : "GigaChat"}</span>
          <span className={styles.timestamp}>{timestamp}</span>
        </div>

        <div className={styles.content}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        <button className={styles.copyButton} onClick={handleCopy}>
          <Copy size={14} />
          Копировать
        </button>
      </div>
    </div>
  );
}

export default Message;
