import styles from "./PatientDetail.module.css";
import { toast } from "react-toastify";
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
  const patient = patients.find((p) => p._id === patientId);

  function onAddNewVisit() {
    toast.warning("This function will be implemented in the future", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    });
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
        toast.success("Patient Deleted", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
        setpatientId(null);
        setPatients(patients.filter((p) => p._id !== patientId));
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
        <Button onClick={closeModal} type="patientB">
          Back
        </Button>
      </div>
      <div className={styles.header}>
        <h2>Patient&apos;s Details</h2>
        <Button onClick={handleDelete} type="patientSec">
          Delete
        </Button>
        <Button onClick={onPrefilledModalOpen} type="patientSec">
          Update
        </Button>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.row}>
          <p>First Name :</p>
          <p>{patient.first_name}</p>
        </div>
        <div className={styles.row}>
          <p>Last Name :</p>
          <p>{patient.last_name}</p>
        </div>
        <div className={styles.row}>
          <p>Date of Birth :</p>
          <p>{patient.date_of_birth}</p>
        </div>
        <div className={styles.row}>
          <p>Gender :</p>
          <p>{patient.gender}</p>
        </div>
        <div className={styles.row}>
          <p>Email :</p>
          <p>{patient.email}</p>
        </div>
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
              <div className={styles.visit} key={v.date}>
                <div className={styles.row}>
                  <p>Date :</p>
                  <p>{v.date}</p>
                </div>
                <div className={styles.row}>
                  <p>Height :</p>
                  <p>{v.height}</p>
                </div>
                <div className={styles.row}>
                  <p>Blood Pressure :</p>
                  <p>{v.blood_pressure}</p>
                </div>
                <div className={styles.row}>
                  <p>Weight :</p>
                  <p>{v.weight}</p>
                </div>
                <div className={styles.row}>
                  <p>Symptoms :</p>
                  <p>{v.symptoms}</p>
                </div>
                <div className={styles.row}>
                  <p>Diagnosis :</p>
                  <p>{v.diagnosis}</p>
                </div>
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
