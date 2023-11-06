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
            <span>Patient Records</span>
          </NavLink>
        </li>
      </ul>
    </nav>
    // <div>
    //   <Link to="/" className="sidebar-link">
    //     Home
    //   </Link>{" "}
    //   {/* Add this line */}
    //   <Link to="/patient-records" className="sidebar-link">
    //     Patient Records
    //   </Link>
    //   <Link to="/scheduling" className="sidebar-link">
    //     Scheduling
    //   </Link>
  );
}

export default AppNav;
