import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  type?: "button" | "submit";
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  size = "md",
  icon,
  type = "button",
}: ButtonProps) {
  let variantClass = styles.primary;
  if (variant === "secondary") variantClass = styles.secondary;
  if (variant === "danger") variantClass = styles.danger;
  if (variant === "ghost") variantClass = styles.ghost;

  let sizeClass = styles.md;
  if (size === "sm") sizeClass = styles.sm;
  if (size === "lg") sizeClass = styles.lg;

  return (
    <button
      className={`${styles.button} ${variantClass} ${sizeClass}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
