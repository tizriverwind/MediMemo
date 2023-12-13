import styles from "./SchedulingPage.module.css";
import Button from "./Button";
import { toast } from "react-toastify"; // ERASE AFTER: this is used for teh pop up alert message
import "./Scheduling.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // this imports the default styling
import Modal from "./Modal";
import AppointmentDisplay from "./AppointmentDisplay";
import AppointmentForm from "./AppointmentForm";

const Scheduling = () => {
  // here we are creating the states to track the selected states
  const [user, setUser] = useState(null);
  // State for selected date
  const [value, setValue] = useState(new Date());
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for the appointment being edited
  const [editingAppointment, setEditingAppointment] = useState(null);
  // const [successMessage, setSuccessMessage] = useState("");
  const [appointmentsData, setAppointmentsData] = useState([]);
  const navigate = useNavigate();
  const firstInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/users/getUser");
      console.log(response);

      if (!response.ok) {
        // If the response is not ok, show a toast and navigate to login
        toast.error("You are not logged in! Please log in", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
        setUser(null);
        navigate("/login");
      } else {
        // Only proceed to process data if the response is ok
        const data = await response.json();
        console.log("Patient Record", data);

        if (data.username) {
          setUser(data.username);
        } else {
          // Handle the case where username is undefined in a successful response
          toast.error("Unable to retrieve user data. Please log in again.", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
          });
          navigate("/login");
        }
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/appointments");
        const result = await response.json();
        console.log("Fetched data:", result.data.appts);

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

  useEffect(() => {
    if (isModalOpen) {
      firstInputRef.current.focus();
    }
  }, [isModalOpen]);

  const onDateChange = (nextValue) => {
    // Open modal or any other logic
    // console.log(successMessage);
    console.log(nextValue); //  just log the date now, wokring on clader function later
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: nextValue.toISOString().substring(0, 10),
    }));
    setValue(nextValue);
    //setIsModalOpen(true); // Open the modal
  };
  // Function to open the update form with the appointment data
  const handleOpenUpdateForm = (appointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true); // Open the modal for editing
  };

  // Function to close the modal and clear editing state
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAppointment(null);
  };
  // working with collecting form info
  // TO DO: MAKE BOTH FORMS THE SAME, ADDING NEW AND WHEN UPDATING
  const [formData, setFormData] = useState({
    patient_name: "",
    doctor_name: "",
    date: new Date().toISOString().substring(0, 10), // Formats today's date as YYYY-MM-DD
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

  // this is used for creating an appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // Prevents the default form submission behavior, which is to reload the page,
    // allowing us to handle the submission process manually with JavaScript for a
    // smoother user experience without a page refresh.
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
        const result = await response.json();
        // TO DO: FIX THIS POP UP MESSAGE NOT WORKING, CHANGE
        // setSuccessMessage("Appointment scheduled successfully!");
        toast.success("Appointment Scheduled Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
        setFormData({
          patient_name: "",
          doctor_name: "",
          date: new Date().toISOString().substring(0, 10), // reset to today's date
          time: "",
          why: "",
          patient_phone: "",
        });

        setIsModalOpen(false); // Close the modal after submission
        const newAppt = formData;
        newAppt._id = result.data.appointment.insertedId;

        setAppointmentsData([...appointmentsData, newAppt]);
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
      if (response.ok) {
        // Handle the response appropriately...
        setIsModalOpen(false);
        setEditingAppointment(null);
        setAppointmentsData((prevAppointments) => {
          const index = prevAppointments.findIndex(
            (a) => a._id === editingAppointment._id
          );
          if (index !== -1) {
            // Replace the updated appointment at the found index
            const updatedAppointments = [...prevAppointments];
            updatedAppointments[index] = {
              ...formData,
              _id: editingAppointment._id,
            };
            return updatedAppointments;
          }
          return prevAppointments; // In case the appointment is not found, return the current state
        });

        toast.success("Updated Appointment!", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
      } else {
        if (response.status === 404) {
          // 404 Not Found error
          console.error("The resource was not found.");
        } else if (response.status === 400) {
          // Handle a 400 Bad Request error
          console.error("The request is invalid.");
        } else if (!response.ok) {
          // Handle other network errors (e.g., 500 Internal Server Error, timeout)
          console.error("Network error while saving the appointment.");
        }
      }
      // You might need to fetch the updated list of appointments here or update the state
    } catch (error) {
      console.error("Error saving the appointment:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className="welcome-text">Welcome to the Scheduling Page</h2>

      <div className={styles.layoutContainer}>
        <div className={styles.calendarFlexContainer}>
          <div className={styles.calendarContainer}>
            <Calendar onChange={onDateChange} value={value} />
          </div>
        </div>
        <div className={styles.formContainer}>
          {editingAppointment ? (
            <Modal show={isModalOpen} onClose={handleCloseModal}>
              <AppointmentForm
                appointment={editingAppointment}
                onSave={handleSaveAppointment}
                onClose={handleCloseModal}
                inputRef={firstInputRef}
              />
            </Modal>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={`${styles.row} ${styles.title}`}>
                <span>New Appointment</span>
              </div>
              <div className={styles.row}>
                <label htmlFor="Patient Name">Patient Name</label>
                <input
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
                <label htmlFor="Doctor Name">Doctor Name</label>
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
                  placeholder="Time (e.g., 03:00 PM)"
                  required
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="why">Why</label>
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
                <label htmlFor="Phone Number">Patient Phone Number</label>
                <input
                  type="tel"
                  id="Phone Number"
                  name="patient_phone"
                  value={formData.patient_phone}
                  onChange={handleChange}
                  placeholder="Patient Phone Number"
                  required
                />
              </div>
              <Button actionType="submit" type="secondary">
                Schedule
              </Button>
            </form>
          )}
        </div>
      </div>
      <AppointmentDisplay
        setAppointmentsData={setAppointmentsData}
        appointmentsData={appointmentsData}
        onEdit={handleOpenUpdateForm}
      />
    </div>
  );
};

export default Scheduling;
