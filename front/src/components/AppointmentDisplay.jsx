import Button from "./Button";

import { toast } from "react-toastify";
import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./AppointmentDisplay.css";

const AppointmentDisplay = ({
  setAppointmentsData,
  appointmentsData,
  onEdit,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const firstInputRef = useRef(null);

  const promptDeleteConfirmation = (appointmentId) => {
    // Show confirmation dialog
    setShowConfirmDialog(true);
    setAppointmentToDelete(appointmentId);
  };

  useEffect(() => {
    if (showConfirmDialog) {
      console.log("hello");
      firstInputRef.current.focus();
    }
  }, [showConfirmDialog]);

  // DELETEING FUNCTION
  const handleDelete = async () => {
    if (appointmentToDelete) {
      try {
        const response = await fetch(
          `/api/appointments/${appointmentToDelete}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          setAppointmentsData(
            appointmentsData.filter(
              (appointment) => appointment._id !== appointmentToDelete
            )
          );
          toast.success("Appointment deleted!", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
          });
        } else {
          console.error("Failed to delete the appointment.");
          toast.error("Failed to delete!", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
          });
        }
      } catch (error) {
        console.error("There was an error deleting the appointment:", error);
        toast.error("Error deleting the appointment.", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
      }
    }
    // Reset confirmation dialog
    setShowConfirmDialog(false);
    setAppointmentToDelete(null);
  };

  const handleCancelDelete = () => {
    // Hide confirmation dialog without deleting
    setShowConfirmDialog(false);
    setAppointmentToDelete(null);
  };
  // END OF DELETEING FUNCTION
  function convertTo12HourFormat(time) {
    // Check if time already has 'AM' or 'PM' and remove it
    const timeSuffix = time.match(/AM|PM/);
    if (timeSuffix) {
      time = time.replace(timeSuffix[0], "").trim();
    }

    let [hours, minutes] = time.split(":").map(Number);
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Ensuring double digits for hours and minutes
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  }
  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`; // Convert to MM-DD-YYYY format
  }

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search appointments by doctor or patient name..."
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
                  <p className="card-title">Name: {appointment.patient_name}</p>
                  <p className="card-text">
                    <strong>Doctor Name:</strong> {appointment.doctor_name}
                  </p>
                  <p className="card-text">
                    <strong>Date:</strong> {formatDate(appointment.date)}
                  </p>
                  <p className="card-text">
                    <strong>Time:</strong>{" "}
                    {convertTo12HourFormat(appointment.time)}
                  </p>
                  <p className="card-text">
                    <strong>Why:</strong> {appointment.why}
                  </p>
                  <p className="card-text">
                    <strong>Patient Number:</strong> {appointment.patient_phone}
                  </p>
                  <button
                    className="button delete-btn"
                    onClick={() => promptDeleteConfirmation(appointment._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="button update-btn"
                    onClick={() => onEdit(appointment)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {showConfirmDialog && (
        <>
          <div className="backdrop" onClick={handleCancelDelete}></div>
          <div className="confirmation-dialog">
            <div className="del-mesg-confirmation">
              <p>
                <strong ref={firstInputRef}>
                  Are you sure you want to delete this appointment?
                </strong>
              </p>
            </div>

            <Button
              inputRef={firstInputRef}
              onClick={handleDelete}
              type="secondary"
            >
              Delete
            </Button>
            <Button onClick={handleCancelDelete} type="secondary">
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

AppointmentDisplay.propTypes = {
  onEdit: PropTypes.func.isRequired,
  appointmentsData: PropTypes.array,
  setAppointmentsData: PropTypes.func,
};

export default AppointmentDisplay;
