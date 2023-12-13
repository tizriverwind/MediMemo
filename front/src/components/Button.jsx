import styles from "./Button.module.css";
import PropTypes from "prop-types";

function Button({ onClick, type, actionType = "button", children, inputRef }) {
  return (
    <button
      onClick={onClick}
      type={actionType}
      {...(inputRef && { ref: inputRef })}
      className={`${styles.button} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["primary", "secondary", "patientB"]),
  actionType: PropTypes.oneOf(["button", "submit", "reset"]),
  children: PropTypes.node,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]), // Optional prop
};

export default Button;
