import styles from "./PatientDetail.module.css";

import Button from "./Button";
function PatientDetail({ patients, patientId, closeModal, addNewVisit }) {
  const patient = patients.find((p) => p.id === patientId);
  const name = patient.first_name + " " + patient.last_name;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Patient's Details</h2>
        <Button onClick={closeModal} type="patientB">
          Back to all patients
        </Button>
      </div>
      <div className={styles.header}>
        <h2>{name}</h2>
        <Button onClick={closeModal} type="patientB">
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
          <Button onClick={addNewVisit} type="patientB">
            Add new visit
          </Button>
        </div>
        {patient.visit.length === 0
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

export default PatientDetail;
