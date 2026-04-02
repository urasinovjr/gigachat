import { useState } from "react";
import { MessageSquare } from "lucide-react";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import styles from "./AuthForm.module.css";

interface AuthFormProps {
  onLogin: (credentials: string, scope: string) => void;
  error?: string;
}

function AuthForm({ onLogin, error: externalError = "" }: AuthFormProps) {
  const [credentials, setCredentials] = useState("");
  const [scope, setScope] = useState("GIGACHAT_API_PERS");
  const [localError, setLocalError] = useState("");

  const displayError = externalError || localError;

  const handleLogin = () => {
    if (credentials.trim() === "") {
      setLocalError("Поле не должно быть пустым");
      return;
    }
    setLocalError("");
    onLogin(credentials, scope);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoBlock}>
          <MessageSquare size={32} className={styles.logoIcon} />
          <h1 className={styles.title}>GigaChat</h1>
        </div>
        <p className={styles.subtitle}>Войдите для начала работы</p>

        <input
          type="password"
          className={`${styles.input} ${displayError ? styles.inputError : ""}`}
          placeholder="Введите Credentials (Base64)"
          value={credentials}
          onChange={(e) => setCredentials(e.target.value)}
        />

        {displayError && <ErrorMessage message={displayError} />}

        <div className={styles.scopeGroup}>
          <label className={styles.scopeLabel}>
            <input
              type="radio"
              name="scope"
              value="GIGACHAT_API_PERS"
              checked={scope === "GIGACHAT_API_PERS"}
              onChange={(e) => setScope(e.target.value)}
            />
            GIGACHAT_API_PERS
          </label>
          <label className={styles.scopeLabel}>
            <input
              type="radio"
              name="scope"
              value="GIGACHAT_API_B2B"
              checked={scope === "GIGACHAT_API_B2B"}
              onChange={(e) => setScope(e.target.value)}
            />
            GIGACHAT_API_B2B
          </label>
          <label className={styles.scopeLabel}>
            <input
              type="radio"
              name="scope"
              value="GIGACHAT_API_CORP"
              checked={scope === "GIGACHAT_API_CORP"}
              onChange={(e) => setScope(e.target.value)}
            />
            GIGACHAT_API_CORP
          </label>
        </div>

        <div className={styles.loginButton}>
          <Button variant="primary" size="lg" onClick={handleLogin}>
            Войти
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
