import { useState } from "react";
import { Plus, X } from "lucide-react";
import { mockChats } from "../../mocks/data";
import Button from "../ui/Button";
import SearchInput from "./SearchInput";
import ChatList from "./ChatList";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ onClose }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChatId, setActiveChatId] = useState("1");

  const filteredChats = mockChats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <span className={styles.logo}>GigaChat</span>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <Button
        variant="primary"
        icon={<Plus size={16} />}
        onClick={() => console.log("Новый чат")}
      >
        Новый чат
      </Button>

      <SearchInput value={searchQuery} onChange={setSearchQuery} />

      <ChatList
        chats={filteredChats}
        activeChatId={activeChatId}
        onChatSelect={setActiveChatId}
        onChatEdit={() => {}}
        onChatDelete={() => {}}
      />
    </div>
  );
}

export default Sidebar;
