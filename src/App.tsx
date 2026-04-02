import { useState, useEffect } from "react";
import AuthForm from "./components/auth/AuthForm";
import AppLayout from "./components/layout/AppLayout";
import Sidebar from "./components/sidebar/Sidebar";
import SettingsPanel from "./components/settings/SettingsPanel";
import AppRoutes from "./app/router/routes";
import { getAccessToken } from "./api/gigachat";
import { defaultSettings } from "./mocks/data";
import type { SettingsData } from "./types";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogin = async (credentials: string, scope: string) => {
    try {
      setAuthError("");
      const accessToken = await getAccessToken(credentials, scope);
      setToken(accessToken);
      setIsAuthenticated(true);
    } catch {
      setAuthError("Не удалось авторизоваться. Проверьте credentials.");
    }
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
    return <AuthForm onLogin={handleLogin} error={authError} />;
  }

  return (
    <>
      <AppLayout
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        sidebar={
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        }
        main={
          <AppRoutes
            token={token}
            settings={settings}
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
