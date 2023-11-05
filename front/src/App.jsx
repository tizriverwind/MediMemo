import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Import sidebar component
import PatientRecords from "./components/PatientRecords.jsx";
import Scheduling from "./components/Scheduling.jsx";
import HomePage from "./components/HomePage.jsx"; // Import the home page component

export default function App() {
  async function testBack() {
    console.log("Testing back...");
    const response = await fetch("/api/appointments", {
      method: "get",
    });

    if (!response.ok) {
      throw new Error("Network reponse was not ok");
    }
    const data = await response.json();
    console.log("got data!", data);
  }

  testBack();
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} /> // Add this line for home page
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route path="/scheduling" element={<Scheduling />} />
        {/* ... Other routes ... */}
      </Routes>
    </Router>
  );
}
