import styles from "./PatientDetail.module.css";
import PropTypes from "prop-types";

import Button from "./Button";
function PatientDetail({
  patients,
  patientId,
  closeModal,
  onPrefilledModalOpen,
  setpatientId,
  setPatients,
}) {
  const patient = patients.find((p) => p.id === patientId);
  const name = patient.first_name + " " + patient.last_name;
  function onAddNewVisit() {
    console.log("New Visit Added!");
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/patients", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      });
      if (res.status === 204) {
        alert("The request has been deleted");
        setpatientId(null);
        setPatients(patients.filter((p) => p.id !== patientId));
      } else {
        alert("Failed to delete!");
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Patient&apos;s Details</h2>
        <Button onClick={closeModal} type="patientB">
          Back to all patients
        </Button>
      </div>
      <div className={styles.header}>
        <h2>{name}</h2>
        <Button onClick={handleDelete} type="patientB">
          Delete
        </Button>
        <Button onClick={onPrefilledModalOpen} type="patientB">
          Update
        </Button>
      </div>
      <div className={styles.infoContainer}>
        <p>{"First Name: " + patient.first_name}</p>
        <p>{"Last Name:     " + patient.last_name}</p>
        <p>{"Date of Birth: " + patient.date_of_birth}</p>
        <p>{"Gender:        " + patient.gender}</p>
        <p>{"Email:         " + patient.email}</p>
      </div>

      <div className={styles.summary}>
        <div className={styles.visitContainer}>
          <h3>Visit Summaries</h3>
          <Button onClick={onAddNewVisit} type="patientB">
            Add new visit
          </Button>
        </div>
        {patient.visit === undefined || patient.visit.length === 0
          ? "No visists"
          : patient.visit?.map((v) => (
              <div key={v.date}>
                <p>{"Date : " + v.date}</p>
                <p>{"Height : " + v.height}</p>
                <p>{"Blood Pressure : " + v.blood_pressure}</p>
                <p>{"Weight : " + v.weight}</p>
                <p>{"Symptoms : " + v.symptoms}</p>
                <p>{"Diagnosis : " + v.diagnosis}</p>
              </div>
            ))}
      </div>
    </div>
  );
}
PatientDetail.propTypes = {
  patients: PropTypes.array.isRequired,
  patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  closeModal: PropTypes.func.isRequired,
  onPrefilledModalOpen: PropTypes.func.isRequired,
  setpatientId: PropTypes.func.isRequired,
  setPatients: PropTypes.func.isRequired,
};
export default PatientDetail;
