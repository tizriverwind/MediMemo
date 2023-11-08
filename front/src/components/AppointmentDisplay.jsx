import { useState, useEffect } from "react";

import "./AppointmentDisplay.css";

const AppointmentDisplay = ({ onEdit }) => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/appointments");
        const result = await response.json();
        console.log("Fetched data:", result.data.appts); // TESTING
        // this is what was causing errors
        if (Array.isArray(result.data.appts)) {
          const formattedAppointments = result.data.appts.map(
            (appointment) => ({
              _id: appointment._id,
              patient_name: appointment.patient_name,
              doctor_name: appointment.doctor_name,
              date: appointment.date,
              time: appointment.time,
              why: appointment.why,
              patient_phone: appointment.patient_phone,
            })
          );
          setAppointmentsData(formattedAppointments);
        } else {
          // Handle the case where result.data.appts is not an array
          console.error(
            "result.data.appts is not an array:",
            result.data.appts
          );
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
    fetchData();
  }, []);
  // wokring on delete an appointment__________________________________NOT WORKING
  // DELETEING FUNCTION
  const handleDelete = async (appointmentId) => {
    console.log("Attempting to delete appointment with ID:", appointmentId); //TESTING

    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // no body is needed for a delete request
      });

      if (response.ok) {
        // Remove the appointment from the state to update the UI
        setAppointmentsData(
          appointmentsData.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
      } else {
        console.error("Failed to delete the appointment.");
      }
    } catch (error) {
      console.error("There was an error deleting the appointment:", error);
    }
  };
  // END OF DELETEING FUNCTION

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search appointments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <p className="appointment-subheading-text">Scheduled Appointments</p>
      {/* <SearchBar query={query} setQuery={setQuery} /> */}
      <div className="row">
        {appointmentsData
          .filter((appointment) => {
            const query = searchQuery.toLowerCase();
            return (
              appointment.patient_name.toLowerCase().includes(query) ||
              appointment.doctor_name.toLowerCase().includes(query) ||
              appointment.why.toLowerCase().includes(query)
              // Add more fields to search by if necessary
            );
          })
          .map((appointment, index) => (
            <div key={index} className="col-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Name: {appointment.patient_name}
                  </h5>
                  <p className="card-text">
                    <strong>Doctor Name:</strong> {appointment.doctor_name}
                  </p>
                  <p className="card-text">
                    <strong>Date:</strong> {appointment.date}
                  </p>
                  <p className="card-text">
                    <strong>Time:</strong> {appointment.time}
                  </p>
                  <p className="card-text">
                    <strong>Why:</strong> {appointment.why}
                  </p>
                  <p className="card-text">
                    <strong>Patient Number:</strong> {appointment.patient_phone}
                  </p>
                  <button
                    className="button update-btn"
                    onClick={() => onEdit(appointment)}
                  >
                    Update
                  </button>

                  <button
                    className="button delete-btn"
                    onClick={() => handleDelete(appointment._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
  // end of wokring on delete an appointment
};

export default AppointmentDisplay;
