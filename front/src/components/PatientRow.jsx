import PropTypes from "prop-types";
import styles from "./PatientRow.module.css";
function PatientRow({
  selectPatientId,
  patient,
  first_name,
  last_name,
  id,
  date_of_birth,
  gender,
}) {
  const handleKeyDown = (event) => {
    // Check if the 'Enter' key is pressed
    if (event.key === "Enter") {
      selectPatientId(patient._id);
    }
  };

  return (
    <div
      onClick={() => selectPatientId(patient._id)}
      onKeyDown={handleKeyDown}
      className={styles.container}
      tabIndex={0} // Make the div focusable
      role="button" // Indicate that the div is interactive
      aria-pressed="false"
    >
      <div>{id}</div>
      <div>{first_name + " " + last_name}</div>
      <div>{date_of_birth}</div>
      <div>{gender}</div>
    </div>
  );
}
PatientRow.propTypes = {
  selectPatientId: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  date_of_birth: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
};

export default PatientRow;
