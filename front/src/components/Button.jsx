import styles from "./Button.module.css";
import PropTypes from "prop-types";

function Button({ onClick, type, children }) {
  return (
    <button onClick={onClick} className={`${styles.button} ${styles[type]}`}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["primary", "secondary", "patientB"]),
  children: PropTypes.node,
};

export default Button;
