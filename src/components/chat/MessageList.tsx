import { useRef, useEffect } from "react";
import type { MessageData } from "../../types";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import EmptyState from "./EmptyState";
import styles from "./MessageList.module.css";

interface MessageListProps {
  messages: MessageData[];
  isTyping: boolean;
}

function MessageList({ messages, isTyping }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return <EmptyState />;
  }

  return (
    <div className={styles.messageList}>
      {messages.map((msg) => (
        <Message
          key={msg.id}
          role={msg.role}
          content={msg.content}
          timestamp={msg.timestamp}
        />
      ))}
      <TypingIndicator isVisible={isTyping} />
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
