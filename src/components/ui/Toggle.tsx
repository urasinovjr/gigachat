import styles from "./Toggle.module.css";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <div className={styles.toggle} onClick={() => onChange(!checked)}>
      <div className={`${styles.track} ${checked ? styles.trackActive : ""}`}>
        <div className={`${styles.thumb} ${checked ? styles.thumbActive : ""}`} />
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}

export default Toggle;
