import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import styles from "./AppLayout.module.css";
import Scheduling from "../components/Scheduling";
function AppLayout() {
  return (
    <div className={styles.appPage}>
      <Header />
      <Sidebar />
      <div className={styles.dashboard}>
        <div className={styles.container}>
          <Scheduling />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
