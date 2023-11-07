import React, { useState, useEffect } from "react";

const AppointmentForm = ({ appointment, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    patient_name: "",
    doctor_name: "",
    date: "",
    time: "",
    why: "",
    patient_phone: "",
  });

  // When the component receives a new appointment for editing, pre-fill the form data
  useEffect(() => {
    if (appointment) {
      setFormData({
        patient_name: appointment.patient_name,
        doctor_name: appointment.doctor_name,
        date: appointment.date,
        time: appointment.time,
        why: appointment.why,
        patient_phone: appointment.patient_phone,
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
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
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
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
      <button type="submit">Save Appointment</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default AppointmentForm;
