import { useState } from "react";
import { Paperclip, Send, Square } from "lucide-react";
import styles from "./InputArea.module.css";

interface InputAreaProps {
  onSend: (text: string) => void;
  onStop: () => void;
  isGenerating?: boolean;
}

function InputArea({ onSend, onStop, isGenerating = false }: InputAreaProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim() === "") return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.inputArea}>
      <button className={styles.attachButton} title="Прикрепить изображение">
        <Paperclip size={18} />
      </button>

      <textarea
        className={styles.textarea}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Введите сообщение..."
        rows={1}
      />

      {isGenerating ? (
        <button className={styles.stopButton} onClick={onStop}>
          <Square size={16} />
        </button>
      ) : (
        <button
          className={styles.sendButton}
          onClick={handleSend}
          disabled={value.trim() === ""}
        >
          <Send size={18} />
        </button>
      )}
    </div>
  );
}

export default InputArea;
