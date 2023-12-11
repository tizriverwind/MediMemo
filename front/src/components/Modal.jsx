import "./Modal.css"; // Import CSS styles for the modal
import PropTypes from "prop-types";
import { HiOutlineX } from "react-icons/hi";

const Modal = ({ show, children, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose} className="modal-close-btn">
          <HiOutlineX />
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired, // show is a boolean and it is required
  children: PropTypes.node, // children can be any renderable React elements or nodes
  onClose: PropTypes.func.isRequired, // onClose is a function and it is required
};

export default Modal;
