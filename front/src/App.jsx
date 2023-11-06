import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Import sidebar component
import PatientRecords from "./components/PatientRecords.jsx";
import Schedule from "./Pages/Schedule.jsx";
import HomePage from "./Pages/HomePage.jsx"; // Import the home page component
import PageNotFound from "./Pages/PageNotFound";
import Login from "./Pages/Login";
import AppLayout from "./Pages/AppLayout";
import Signup from "./Pages/SignUp";

export default function App() {
  // async function testBack() {
  //   console.log("Testing back...");
  //   const response = await fetch("/api/appointments", {
  //     method: "get",
  //   });

  //   if (!response.ok) {
  //     throw new Error("Network reponse was not ok");
  //   }
  //   const data = await response.json();
  //   console.log("got data!", data);
  // }

  // testBack();
  return (
    <Router>
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="app" element={<AppLayout />}>
          <Route path="patient-records" element={<PatientRecords />} />
          <Route path="scheduling" element={<Schedule />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        {/* ... Other routes ... */}
      </Routes>
    </Router>
  );
}
