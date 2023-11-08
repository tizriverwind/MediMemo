import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
import {
  HiOutlineCalendarDays,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
function AppNav() {
  return (
    <nav>
      <ul className={styles.navlist}>
        <li>
          <NavLink to="/app/patient-records" className={styles.navlink}>
            <HiOutlineClipboardDocumentList />
            <span>Patient Records</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/scheduling" className={styles.navlink}>
            <HiOutlineCalendarDays />
            <span>Schedule</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
