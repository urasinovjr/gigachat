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
  if (messages.length === 0) {
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
    </div>
  );
}

export default MessageList;
