import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  async function onLogout() {
    const response = await fetch("/api/users/logout", {
      method: "POST",
    });
    if (!response.ok) {
      return;
    }

    console.log("Logging out redirecting");
    navigate("/login");
  }
  return (
    <div className={styles.sidebar}>
      <div className={styles.firstComponent}>
        <div className={styles.logotitle}>
          <Logo />
          <p> Medimemo</p>
        </div>
        <AppNav />
      </div>
      <Button onClick={onLogout} className={styles.signOut} type="secondary">
        Sign Out
      </Button>
    </div>
  );
};

export default Sidebar;
