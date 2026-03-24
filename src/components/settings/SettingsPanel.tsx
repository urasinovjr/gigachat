import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { SettingsData, ModelName } from "../../types";
import Button from "../ui/Button";
import Slider from "../ui/Slider";
import Toggle from "../ui/Toggle";
import styles from "./SettingsPanel.module.css";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SettingsData;
  onSave: (settings: SettingsData) => void;
  onReset: () => void;
}

function SettingsPanel({ isOpen, onClose, settings, onSave, onReset }: SettingsPanelProps) {
  const [local, setLocal] = useState<SettingsData>(settings);

  useEffect(() => {
    setLocal(settings);
  }, [settings]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 className={styles.title}>Настройки</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Модель</label>
          <select
            className={styles.select}
            value={local.model}
            onChange={(e) => setLocal({ ...local, model: e.target.value as ModelName })}
          >
            <option value="GigaChat">GigaChat</option>
            <option value="GigaChat-Plus">GigaChat-Plus</option>
            <option value="GigaChat-Pro">GigaChat-Pro</option>
            <option value="GigaChat-Max">GigaChat-Max</option>
          </select>
        </div>

        <div className={styles.field}>
          <Slider
            label="Temperature"
            min={0}
            max={2}
            step={0.1}
            value={local.temperature}
            onChange={(v) => setLocal({ ...local, temperature: v })}
          />
        </div>

        <div className={styles.field}>
          <Slider
            label="Top-P"
            min={0}
            max={1}
            step={0.01}
            value={local.topP}
            onChange={(v) => setLocal({ ...local, topP: v })}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Max Tokens</label>
          <input
            type="number"
            className={styles.numberInput}
            min={1}
            max={8192}
            value={local.maxTokens}
            onChange={(e) => setLocal({ ...local, maxTokens: Number(e.target.value) })}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>System Prompt</label>
          <textarea
            className={styles.textarea}
            rows={4}
            value={local.systemPrompt}
            onChange={(e) => setLocal({ ...local, systemPrompt: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <Toggle
            label="Тёмная тема"
            checked={local.theme === "dark"}
            onChange={(checked) => setLocal({ ...local, theme: checked ? "dark" : "light" })}
          />
        </div>

        <div className={styles.buttons}>
          <Button variant="primary" onClick={() => onSave(local)}>Сохранить</Button>
          <Button variant="secondary" onClick={onReset}>Сбросить</Button>
        </div>
      </div>
    </>
  );
}

export default SettingsPanel;
