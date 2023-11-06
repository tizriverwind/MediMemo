import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-link">
        Home
      </Link>{" "}
      {/* Add this line */}
      <Link to="/patient-records" className="sidebar-link">
        Patient Records
      </Link>
      <Link to="/scheduling" className="sidebar-link">
        Scheduling
      </Link>
      {/* ... Other links ... */}
    </div>
  );
};

export default Sidebar;
