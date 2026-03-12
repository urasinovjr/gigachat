import type { Chat } from "../../types";
import ChatItem from "./ChatItem";
import styles from "./ChatList.module.css";

interface ChatListProps {
  chats: Chat[];
  activeChatId: string;
  onChatSelect: (id: string) => void;
  onChatEdit: (id: string) => void;
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
          lastMessageDate={chat.lastMessageDate}
          isActive={chat.id === activeChatId}
          onSelect={() => onChatSelect(chat.id)}
          onEdit={() => onChatEdit(chat.id)}
          onDelete={() => onChatDelete(chat.id)}
        />
      ))}
    </div>
  );
}

export default ChatList;
