import { useState, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { useChatContext } from "../../app/providers/ChatContext";
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
  const { state, dispatch } = useChatContext();
  const navigate = useNavigate();
  const location = useLocation();
  const pathMatch = location.pathname.match(/^\/chat\/(.+)$/);
  const activeId = pathMatch ? pathMatch[1] : "";

  const filteredChats = useMemo(() => {
    return state.chats.filter((chat) => {
      const query = searchQuery.toLowerCase();
      const titleMatch = chat.title.toLowerCase().includes(query);
      const chatMessages = state.messages[chat.id] || [];
      const lastMessage = chatMessages[chatMessages.length - 1];
      const messageMatch = lastMessage
        ? lastMessage.content.toLowerCase().includes(query)
        : false;
      return titleMatch || messageMatch;
    });
  }, [state.chats, state.messages, searchQuery]);

  const handleNewChat = useCallback(() => {
    const newId = String(Date.now());
    dispatch({
      type: "CREATE_CHAT",
      payload: {
        id: newId,
        title: "Новый чат",
        createdAt: new Date().toISOString(),
      },
    });
    navigate(`/chat/${newId}`);
    onClose();
  }, [dispatch, navigate, onClose]);

  const handleSelect = useCallback((chatId: string) => {
    dispatch({ type: "SET_ACTIVE_CHAT", payload: chatId });
    navigate(`/chat/${chatId}`);
    onClose();
  }, [dispatch, navigate, onClose]);

  const handleEdit = useCallback((chatId: string, newTitle: string) => {
    dispatch({ type: "RENAME_CHAT", payload: { id: chatId, title: newTitle } });
  }, [dispatch]);

  const handleDelete = useCallback((chatId: string) => {
    dispatch({ type: "DELETE_CHAT", payload: chatId });
    if (activeId === chatId) {
      navigate("/");
    }
  }, [dispatch, activeId, navigate]);

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
        onClick={handleNewChat}
      >
        Новый чат
      </Button>

      <SearchInput value={searchQuery} onChange={setSearchQuery} />

      <ChatList
        chats={filteredChats}
        activeChatId={activeId || ""}
        onChatSelect={handleSelect}
        onChatEdit={handleEdit}
        onChatDelete={handleDelete}
      />
    </div>
  );
}

export default Sidebar;
