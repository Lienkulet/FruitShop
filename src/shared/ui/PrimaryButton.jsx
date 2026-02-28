import styles from "./PrimaryButton.module.css";

export default function PrimaryButton({ children, className = "", type = "button" }) {
  return (
    <button type={type} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
}
