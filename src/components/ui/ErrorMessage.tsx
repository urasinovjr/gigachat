import { AlertCircle } from "lucide-react";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.error}>
      <AlertCircle size={16} className={styles.icon} />
      <span className={styles.text}>{message}</span>
    </div>
  );
}

export default ErrorMessage;
