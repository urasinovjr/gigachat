import { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { useChatContext } from "../../app/providers/ChatContext";
import { sendMessageStream, sendMessageRest } from "../../api/gigachat";
import type { MessageData, SettingsData } from "../../types";
import MessageList from "./MessageList";
import InputArea from "./InputArea";
import ErrorBoundary from "../ErrorBoundary";
import styles from "./ChatWindow.module.css";

interface ChatWindowProps {
  token: string;
  settings: SettingsData;
  onOpenSettings: () => void;
}

function ChatWindow({ token, settings, onOpenSettings }: ChatWindowProps) {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useChatContext();
  const abortRef = useRef<AbortController | null>(null);
  const navigate = useNavigate();

  const chat = state.chats.find((c) => c.id === id);
  const messages = id ? state.messages[id] || [] : [];
  const chatTitle = chat ? chat.title : "Чат";

  useEffect(() => {
    if (id && !state.chats.find((c) => c.id === id)) {
      navigate("/", { replace: true });
    }
  }, [id, state.chats, navigate]);

  const handleSend = async (text: string) => {
    if (!id) return;

    const now = new Date();
    const time = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");

    const userMessage: MessageData = {
      id: String(Date.now()),
      role: "user",
      content: text,
      timestamp: time,
    };

    dispatch({ type: "ADD_MESSAGE", payload: { chatId: id, message: userMessage } });
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    const currentMessages = [...messages, userMessage];
    if (currentMessages.filter((m) => m.role === "user").length === 1) {
      const autoTitle = text.length > 35 ? text.substring(0, 35) + "..." : text;
      dispatch({ type: "RENAME_CHAT", payload: { id, title: autoTitle } });
    }

    const apiMessages: { role: "system" | "user" | "assistant"; content: string }[] = [];
    if (settings.systemPrompt) {
      apiMessages.push({ role: "system", content: settings.systemPrompt });
    }
    for (const msg of currentMessages) {
      if (msg.role === "user" || msg.role === "assistant") {
        apiMessages.push({ role: msg.role, content: msg.content });
      }
    }

    const assistantId = String(Date.now() + 1);
    const assistantTime =
      new Date().getHours() + ":" + String(new Date().getMinutes()).padStart(2, "0");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      let fullContent = "";

      const assistantMessage: MessageData = {
        id: assistantId,
        role: "assistant",
        content: "",
        timestamp: assistantTime,
      };
      dispatch({ type: "ADD_MESSAGE", payload: { chatId: id, message: assistantMessage } });

      try {
        await sendMessageStream(
          token,
          apiMessages,
          settings,
          (chunk) => {
            fullContent += chunk;
            dispatch({
              type: "UPDATE_MESSAGE",
              payload: { chatId: id, messageId: assistantId, content: fullContent },
            });
          },
          () => {},
          controller.signal
        );
      } catch (streamError) {
        if (controller.signal.aborted) throw streamError;

        const restContent = await sendMessageRest(
          token,
          apiMessages,
          settings,
          controller.signal
        );
        dispatch({
          type: "UPDATE_MESSAGE",
          payload: { chatId: id, messageId: assistantId, content: restContent },
        });
      }
    } catch (err) {
      if (controller.signal.aborted) {
        // ignore
      } else {
        const errorMessage = (err as Error).message || "Произошла ошибка";
        dispatch({ type: "SET_ERROR", payload: errorMessage });
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
      abortRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>
        <h2 className={styles.chatTitle}>{chatTitle}</h2>
        <button className={styles.settingsButton} onClick={onOpenSettings}>
          <Settings size={20} />
        </button>
      </div>

      <ErrorBoundary>
        <MessageList messages={messages} isTyping={state.isLoading} />
      </ErrorBoundary>

      {state.error && (
        <div className={styles.errorBar}>
          <span>{state.error}</span>
          <button
            className={styles.retryButton}
            onClick={() => dispatch({ type: "SET_ERROR", payload: null })}
          >
            Повторить
          </button>
        </div>
      )}

      <InputArea
        onSend={handleSend}
        disabled={state.isLoading}
        isLoading={state.isLoading}
        onStop={handleStop}
      />
    </div>
  );
}

export default ChatWindow;
