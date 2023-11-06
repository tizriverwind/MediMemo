import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logotitle}>
        <Logo />
        <p> Medimemo</p>
      </div>
      <AppNav />
      {/* ... Other links ... */}
    </div>
  );
};

export default Sidebar;
