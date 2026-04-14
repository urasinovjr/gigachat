import { Component } from "react";
import type { ReactNode } from "react";
import styles from "./ErrorBoundary.module.css";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("ErrorBoundary caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorFallback}>
          <p className={styles.errorText}>Что-то пошло не так при отображении сообщений</p>
          <button
            className={styles.retryButton}
            onClick={() => this.setState({ hasError: false })}
          >
            Повторить
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
