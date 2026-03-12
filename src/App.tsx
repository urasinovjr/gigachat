import { useState, useEffect } from "react";
import AuthForm from "./components/auth/AuthForm";
import AppLayout from "./components/layout/AppLayout";
import Sidebar from "./components/sidebar/Sidebar";
import ChatWindow from "./components/chat/ChatWindow";
import SettingsPanel from "./components/settings/SettingsPanel";
import { defaultSettings, mockChats } from "./mocks/data";
import type { SettingsData } from "./types";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const activeChatId = "1";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogin = (credentials: string, scope: string) => {
    console.log("Логин:", credentials, scope);
    setIsAuthenticated(true);
  };

  const handleSaveSettings = (newSettings: SettingsData) => {
    setSettings(newSettings);
    setTheme(newSettings.theme);
    setIsSettingsOpen(false);
  };

  const handleResetSettings = () => {
    setSettings(defaultSettings);
    setTheme("light");
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthenticated) {
    return <AuthForm onLogin={handleLogin} />;
  }

  const activeChat = mockChats.find((chat) => chat.id === activeChatId);
  const activeChatTitle = activeChat ? activeChat.title : "Чат";

  return (
    <>
      <AppLayout
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        sidebar={<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
        main={
          <ChatWindow
            chatTitle={activeChatTitle}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        }
      />

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
        onReset={handleResetSettings}
      />
    </>
  );
}

export default App;
