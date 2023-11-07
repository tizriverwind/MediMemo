import PropTypes from "prop-types";
import styles from "./PatientRow.module.css";
function PatientRow({
  selectPatientId,
  first_name,
  last_name,
  id,
  date_of_birth,
  gender,
}) {
  return (
    <div onClick={() => selectPatientId(id)} className={styles.container}>
      <div>{id}</div>
      <div>{first_name + " " + last_name}</div>
      <div>{date_of_birth}</div>
      <div>{gender}</div>
    </div>
  );
}
PatientRow.propTypes = {
  selectPatientId: PropTypes.func.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  date_of_birth: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
};

export default PatientRow;
