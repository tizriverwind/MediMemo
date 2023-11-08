import { useState } from "react";
import PropTypes from "prop-types";
import "./AppointmentDisplay.css";

const AppointmentDisplay = ({
  setAppointmentsData,
  appointmentsData,
  onEdit,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

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

      <div className="row">
        {appointmentsData
          .filter((appointment) => {
            const query = searchQuery.toLowerCase();
            return (
              appointment.patient_name.toLowerCase().includes(query) ||
              appointment.doctor_name.toLowerCase().includes(query) ||
              appointment.why.toLowerCase().includes(query)
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
};

AppointmentDisplay.propTypes = {
  onEdit: PropTypes.func.isRequired,
  appointmentsData: PropTypes.array,
  setAppointmentsData: PropTypes.func,
};

export default AppointmentDisplay;
