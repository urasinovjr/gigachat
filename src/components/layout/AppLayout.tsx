import { Menu } from "lucide-react";
import styles from "./AppLayout.module.css";

interface AppLayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

function AppLayout({ sidebar, main, isSidebarOpen, onToggleSidebar }: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.overlayVisible : ""}`}
        onClick={onToggleSidebar}
      />

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""}`}>
        {sidebar}
      </aside>

      <main className={styles.main}>
        <button className={styles.burgerButton} onClick={onToggleSidebar}>
          <Menu size={24} />
        </button>
        {main}
      </main>
    </div>
  );
}

export default AppLayout;
