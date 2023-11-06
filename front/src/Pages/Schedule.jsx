import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import styles from "./AppLayout.module.css";
function Schedule() {
  return (
    <div className={styles.appPage}>
      <Header />
      <Sidebar />
      <div className={styles.dashboard}>
        <div className={styles.container}>
          <p>Schedule</p>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
