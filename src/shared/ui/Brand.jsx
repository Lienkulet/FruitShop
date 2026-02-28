import styles from "./Brand.module.css";

export default function Brand({ dark = false }) {
  return (
    <div className={`${styles.brand} ${dark ? styles.dark : ""}`}>
      <span className={styles.icon}>🍓</span>
      <span>Fruit Burst</span>
    </div>
  );
}
