import type { Chat } from "../../types";
import ChatItem from "./ChatItem";
import styles from "./ChatList.module.css";

interface ChatListProps {
  chats: Chat[];
  activeChatId: string;
  onChatSelect: (id: string) => void;
  onChatEdit: (id: string, newTitle: string) => void;
  onChatDelete: (id: string) => void;
}

function ChatList({ chats, activeChatId, onChatSelect, onChatEdit, onChatDelete }: ChatListProps) {
  return (
    <div className={styles.chatList}>
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          id={chat.id}
          title={chat.title}
          createdAt={chat.createdAt}
          isActive={chat.id === activeChatId}
          onSelect={() => onChatSelect(chat.id)}
          onEdit={(newTitle) => onChatEdit(chat.id, newTitle)}
          onDelete={() => onChatDelete(chat.id)}
        />
      ))}
    </div>
  );
}

export default ChatList;
