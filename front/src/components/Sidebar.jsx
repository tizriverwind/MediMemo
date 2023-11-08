import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  function handleSignOut() {
    navigate("/");
  }
  return (
    <div className={styles.sidebar}>
      <div className={styles.logotitle}>
        <Logo />
        <p> Medimemo</p>
      </div>
      <AppNav />
      <Button
        onClick={handleSignOut}
        className={styles.signOut}
        type="secondary"
      >
        Sign Out
      </Button>
      {/* ... Other links ... */}
    </div>
  );
};

export default Sidebar;
