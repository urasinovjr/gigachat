import { Bot } from "lucide-react";
import styles from "./TypingIndicator.module.css";

interface TypingIndicatorProps {
  isVisible: boolean;
}

function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.typing}>
      <div className={styles.avatar}>
        <Bot size={20} />
      </div>
      <div className={styles.bubble}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
}

export default TypingIndicator;
