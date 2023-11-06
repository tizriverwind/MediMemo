import React, { useState, useEffect } from "react";

const AppointmentsSidebar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Function to fetch appointments from the API
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/appointments"); // Use your actual API endpoint here
        if (response.ok) {
          const json = await response.json();
          if (json.status === "success" && Array.isArray(json.data)) {
            setAppointments(json.data);
          } else {
            console.error("Unexpected format or failure status", json);
          }
        } else {
          console.error("HTTP error", response.status);
        }
      } catch (error) {
        console.error("There was a problem fetching the appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="appointments-sidebar">
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>
            <div className="appointment-date">{appointment.date}</div>
            <div className="appointment-time">{appointment.time}</div>
            <div className="appointment-name">{appointment.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsSidebar;
