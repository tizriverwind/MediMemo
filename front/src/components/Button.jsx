import styles from "./Button.module.css";
import PropTypes from "prop-types";

function Button({ onClick, type, actionType = "button", children }) {
  return (
    <button
      onClick={onClick}
      type={actionType}
      className={`${styles.button} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["primary", "secondary", "patientB"]),
  actionType: PropTypes.oneOf(["button", "submit", "reset"]),
  children: PropTypes.node,
};

export default Button;
