import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logocontainer}>
      <img src="/logo.png" alt="Medimemo logo" className={styles.logo} />
    </div>
  );
}

export default Logo;
