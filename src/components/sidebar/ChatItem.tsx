import { useState, memo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import styles from "./ChatItem.module.css";

interface ChatItemProps {
  id: string;
  title: string;
  createdAt: string;
  isActive: boolean;
  onSelect: () => void;
  onEdit: (newTitle: string) => void;
  onDelete: () => void;
}

function ChatItem({ title, createdAt, isActive, onSelect, onEdit, onDelete }: ChatItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleStartEdit = () => {
    setEditValue(title);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== title) {
      onEdit(trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Удалить этот чат?")) {
      onDelete();
    }
  };

  const dateStr = new Date(createdAt).toLocaleDateString("ru-RU");

  return (
    <div className={`${styles.chatItem} ${isActive ? styles.active : ""}`}>
      <div className={styles.info} onClick={onSelect}>
        {isEditing ? (
          <input
            className={styles.editInput}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <>
            <span className={styles.title}>{title}</span>
            <span className={styles.date}>{dateStr}</span>
          </>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={handleStartEdit}>
          <Pencil size={14} />
        </button>
        <button className={styles.actionButton} onClick={handleDelete}>
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

export default memo(ChatItem);
