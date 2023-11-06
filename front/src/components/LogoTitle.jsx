import { Link } from "react-router-dom";
import styles from "./LogoTitle.module.css";

function LogoTitle() {
  return (
    <Link to="/">
      <div className={styles.side}>
        <img src="/logo.png" alt="Medimemo logo" className={styles.logo} />
        <p>MEDIMEMO</p>
      </div>
    </Link>
  );
}

export default LogoTitle;
