import { Settings } from "lucide-react";
import { mockMessages } from "../../mocks/data";
import MessageList from "./MessageList";
import InputArea from "./InputArea";
import styles from "./ChatWindow.module.css";

interface ChatWindowProps {
  chatTitle: string;
  onOpenSettings: () => void;
}

function ChatWindow({ chatTitle, onOpenSettings }: ChatWindowProps) {
  const isTyping = true;

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>
        <h2 className={styles.chatTitle}>{chatTitle}</h2>
        <button className={styles.settingsButton} onClick={onOpenSettings}>
          <Settings size={20} />
        </button>
      </div>

      <MessageList messages={mockMessages} isTyping={isTyping} />

      <InputArea
        onSend={(text) => console.log("Отправлено:", text)}
        onStop={() => console.log("Стоп")}
        isGenerating={false}
      />
    </div>
  );
}

export default ChatWindow;
