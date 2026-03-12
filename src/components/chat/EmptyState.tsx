import { MessageSquarePlus } from "lucide-react";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

function EmptyState({
  title = "Начните новый диалог",
  description = "Выберите чат или создайте новый",
}: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <MessageSquarePlus size={64} className={styles.icon} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default EmptyState;
