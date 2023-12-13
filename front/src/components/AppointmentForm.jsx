import styles from "./SchedulingPage.module.css";
import Button from "./Button";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// for updating form
const AppointmentForm = ({ appointment, onSave, onClose, inputRef }) => {
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
      console.log("Original date from appointment:", appointment.date); // Step 1: Log the original date

      const [month, day, year] = appointment.date.split("-");

      console.log("Split date:", { month, day, year }); // TESTING
      const formattedMonth = month.padStart(2, "0");
      const formattedDay = day.padStart(2, "0");

      const formattedDate = `${formattedMonth}-${formattedDay}-${year}`;

      console.log("Formatted date:", formattedDate); // TESTING

      setFormData({
        patient_name: appointment.patient_name,
        doctor_name: appointment.doctor_name,
        date: formattedDate,
        time: convertTo24HourFormat(appointment.time),
        why: appointment.why,
        patient_phone: appointment.patient_phone,
      });
    }
  }, [appointment]);

  const convertTo24HourFormat = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

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
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={`${styles.row} ${styles.title}`}>
        <span>Update Appointment</span>
      </div>
      <div className={styles.row}>
        <label htmlFor="patient_name">Patient Name</label>
        <input
          ref={inputRef}
          type="text"
          id="patient_name"
          name="patient_name"
          value={formData.patient_name}
          onChange={handleChange}
          placeholder="Patient Name"
          required
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="doctor_name">Doctor Name</label>
        <input
          type="text"
          id="doctor_name"
          name="doctor_name"
          value={formData.doctor_name}
          onChange={handleChange}
          placeholder="Doctor Name"
          required
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="time">Time</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="why">why</label>
        <textarea
          name="why"
          id="why"
          value={formData.why}
          onChange={handleChange}
          placeholder="Reason for Visit"
          required
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="patient_phone">Patient Phone</label>
        <input
          type="tel"
          id="patient_phone"
          name="patient_phone"
          value={formData.patient_phone}
          onChange={handleChange}
          placeholder="Patient Phone Number"
          required
        />
      </div>
      <Button actionType="submit" type="secondary">
        Save Appointment
      </Button>
      <Button Button actionType="submit" type="secondary" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
};

AppointmentForm.propTypes = {
  appointment: PropTypes.object,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
  inputRef: PropTypes.func,
};

export default AppointmentForm;
