import "./SchedulingPage.css";
// import React, { useState } from "react";
import React, { useState, useEffect } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // this imports the default styling
<<<<<<< Updated upstream:front/src/components/SchedulingPage/Scheduling.jsx
import Modal from "../modalScheduling/Modal"; // Make sure the path to your modal component is correct
// import AppointmentsSidebar from "../AppointmentSideBar/AppointmentSideBar"; // Import the appointment card component
=======
import Modal from "./Modal"; // Make sure the path to your modal component is correct
import AppointmentDisplay from "./AppointmentDisplay";
import AppointmentForm from "./AppointmentForm";
>>>>>>> Stashed changes:front/src/components/Scheduling.jsx

const Scheduling = () => {
  // here we are creating the states to track the selected states
  // State for selected date
  const [value, setValue] = useState(new Date());
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
<<<<<<< Updated upstream:front/src/components/SchedulingPage/Scheduling.jsx
  const [successMessage, setSuccessMessage] = useState("");

  // useEffect hook to clear the success message after 5 seconds
  useEffect(() => {
    let timer;
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }
    // Clean up function
    return () => clearTimeout(timer);
  }, [successMessage]); // This will re-run every time successMessage changes
=======
  // State for the appointment being edited
  const [editingAppointment, setEditingAppointment] = useState(null);
>>>>>>> Stashed changes:front/src/components/Scheduling.jsx

  const onDateChange = (nextValue) => {
    // Open modal or any other logic
    console.log(nextValue); //  just log the date now, wokring on clader function later
    setValue(nextValue);
    setIsModalOpen(true); // Open the modal
  };
  // Function to open the update form with the appointment data
  const handleOpenUpdateForm = (appointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
  };

  // Function to close the modal and clear editing state
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAppointment(null);
  };
  // working with collecting form info
  const [formData, setFormData] = useState({
    patient_name: "",
    doctor_name: "",
    date: value.toISOString().substring(0, 10), // This will format the selected date as "YYYY-MM-DD", redo
    time: "",
    why: "",
    patient_phone: "",
  });

  //   handleChange function updates the state of formData every time a user types in an input field,
  // ensuring that the formData state always reflects the current input values.

  const handleChange = (e) => {
    // gets the name and vaule "patient_name", "doctor_name"
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); //TESTING
    // Prevents the default form submission behavior, which is to reload the page,
    // allowing us to handle the submission process manually with JavaScript for a
    // smoother user experience without a page refresh.

    // remeber to come back and call API to save the data to the database
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Response status:", response.status); // TESTING
      if (response.ok) {
        // Handle successful submission here
        console.log("Setting success message"); // TESTING
        const newAppointment = await response.json(); // Make sure the server sends back the new appointment data
        setSuccessMessage("Appointment scheduled successfully!");
        setIsModalOpen(false); // Close the modal after submission
      } else {
        // Handle errors here
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      // Handle network errors here
      console.error("Error submitting form:", error);
    }
  };

  // Function to handle saving the appointment (both new and updated appointments)
  const handleSaveAppointment = async (formData) => {
    // Check if we're updating or creating a new appointment
    const method = editingAppointment ? "PUT" : "POST";
    const endpoint = editingAppointment
      ? `/api/appointments/${editingAppointment._id}`
      : "/api/appointments";

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle the response appropriately...
      setIsModalOpen(false);
      setEditingAppointment(null);
      // You might need to fetch the updated list of appointments here or update the state
    } catch (error) {
      console.error("Error saving the appointment:", error);
    }
  };

  return (
    <div className="scheduling-container">
<<<<<<< Updated upstream:front/src/components/SchedulingPage/Scheduling.jsx
      <h1>Scheduled an appointment below.</h1>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <Calendar onChange={onDateChange} value={value} />
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* collecting data here */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            placeholder="Patient Name"
            required
=======
      <h1>Welcome to the Scheduling Page</h1>
      <p className="general-text">
        Click calander day to schedule an appointment.
      </p>
      <div className="content-wrapper">
        <div className="calendar-container">
          <Calendar onChange={onDateChange} value={value} />
        </div>
        <AppointmentDisplay onEdit={handleOpenUpdateForm} />
      </div>
      <Modal show={isModalOpen} onClose={handleCloseModal}>
        {/* Conditional rendering of AppointmentForm */}
        {editingAppointment ? (
          <AppointmentForm
            appointment={editingAppointment}
            onSave={handleSaveAppointment}
            onClose={handleCloseModal}
>>>>>>> Stashed changes:front/src/components/Scheduling.jsx
          />
        ) : (
          // ...The form for creating a new appointment
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              placeholder="Patient Name"
              required
            />
            <input
              type="text"
              name="doctor_name"
              value={formData.doctor_name}
              onChange={handleChange}
              placeholder="Doctor Name"
              required
            />
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Time (e.g., 03:00 PM)"
              required
            />
            <textarea
              name="why"
              value={formData.why}
              onChange={handleChange}
              placeholder="Reason for Visit"
              required
            />
            <input
              type="tel"
              name="patient_phone"
              value={formData.patient_phone}
              onChange={handleChange}
              placeholder="Patient Phone Number"
              required
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </Modal>
      {/* <AppointmentsSidebar /> */}
    </div>
  );
};

export default Scheduling;
