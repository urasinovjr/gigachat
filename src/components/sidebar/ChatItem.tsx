import { Pencil, Trash2 } from "lucide-react";
import styles from "./ChatItem.module.css";

interface ChatItemProps {
  id: string;
  title: string;
  lastMessageDate: string;
  isActive: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function ChatItem({ title, lastMessageDate, isActive, onSelect, onEdit, onDelete }: ChatItemProps) {
  return (
    <div className={`${styles.chatItem} ${isActive ? styles.active : ""}`}>
      <div className={styles.info} onClick={onSelect}>
        <span className={styles.title}>{title}</span>
        <span className={styles.date}>{lastMessageDate}</span>
      </div>

      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={onEdit}>
          <Pencil size={14} />
        </button>
        <button className={styles.actionButton} onClick={onDelete}>
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

export default ChatItem;
