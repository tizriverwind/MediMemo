import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import styles from "./AppLayout.module.css";
import PatientRecords from "../components/PatientRecords";

function AppLayout() {
  return (
    <div className={styles.appPage}>
      <Header />
      <Sidebar />
      <div className={styles.dashboard}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
