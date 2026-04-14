import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import EmptyState from "../../components/chat/EmptyState";
import type { SettingsData } from "../../types";

const ChatWindow = lazy(() => import("../../components/chat/ChatWindow"));

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
          <Suspense fallback={<div />}>
            <ChatWindow
              token={token}
              settings={settings}
              onOpenSettings={onOpenSettings}
            />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
