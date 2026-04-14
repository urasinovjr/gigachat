import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import AuthForm from "./components/auth/AuthForm";
import AppLayout from "./components/layout/AppLayout";
import AppRoutes from "./app/router/routes";
import { getAccessToken } from "./api/gigachat";
import { defaultSettings } from "./mocks/data";
import type { SettingsData } from "./types";

const Sidebar = lazy(() => import("./components/sidebar/Sidebar"));
const SettingsPanel = lazy(() => import("./components/settings/SettingsPanel"));

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

  useEffect(() => {
    const authKey = import.meta.env.VITE_GIGACHAT_AUTH_KEY;
    const scope = import.meta.env.VITE_GIGACHAT_SCOPE || "GIGACHAT_API_PERS";
    if (authKey) {
      getAccessToken(authKey, scope)
        .then((accessToken) => {
          setToken(accessToken);
          setIsAuthenticated(true);
        })
        .catch(() => {});
    }
  }, []);

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

  const handleSaveSettings = useCallback((newSettings: SettingsData) => {
    setSettings(newSettings);
    setTheme(newSettings.theme);
    setIsSettingsOpen(false);
  }, []);

  const handleResetSettings = useCallback(() => {
    setSettings(defaultSettings);
    setTheme("light");
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleOpenSettings = useCallback(() => {
    setIsSettingsOpen(true);
  }, []);

  const handleCloseSettings = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  if (!isAuthenticated) {
    return <AuthForm onLogin={handleLogin} error={authError} />;
  }

  return (
    <>
      <AppLayout
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        sidebar={
          <Suspense fallback={<div />}>
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={handleCloseSidebar}
            />
          </Suspense>
        }
        main={
          <AppRoutes
            token={token}
            settings={settings}
            onOpenSettings={handleOpenSettings}
          />
        }
      />

      <Suspense fallback={<div />}>
        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={handleCloseSettings}
          settings={settings}
          onSave={handleSaveSettings}
          onReset={handleResetSettings}
        />
      </Suspense>
    </>
  );
}

export default App;
