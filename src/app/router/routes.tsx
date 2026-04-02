import { Routes, Route } from "react-router-dom";
import ChatWindow from "../../components/chat/ChatWindow";
import EmptyState from "../../components/chat/EmptyState";
import type { SettingsData } from "../../types";

interface AppRoutesProps {
  token: string;
  settings: SettingsData;
  onOpenSettings: () => void;
}

function AppRoutes({ token, settings, onOpenSettings }: AppRoutesProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={<EmptyState />}
      />
      <Route
        path="/chat/:id"
        element={
          <ChatWindow
            token={token}
            settings={settings}
            onOpenSettings={onOpenSettings}
          />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
