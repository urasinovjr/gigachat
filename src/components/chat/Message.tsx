import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Bot, Copy, Check } from "lucide-react";
import styles from "./Message.module.css";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

function Message({ role, content, timestamp }: MessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

        {role === "assistant" && (
          <button className={styles.copyButton} onClick={handleCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Скопировано" : "Копировать"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Message;
