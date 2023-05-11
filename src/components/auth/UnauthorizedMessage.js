import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import LoginButton from "../LoginButton";
import styles from "./UnauthorizedMessage.module.css";

export default function UnauthorizedPopup({ unauthorized, onClose, message }) {
  return (
    <Popup open={unauthorized} modal onClose={onClose}>
      <div className={styles.modal}>
        <a data-testid="close" className={styles.close} onClick={onClose}>
          &times;
        </a>
        <div className={styles.content}>
          <h1>Unauthorized</h1>
          <p>{message}</p>
          <LoginButton />
        </div>
      </div>
    </Popup>
  );
}

UnauthorizedPopup.propTypes = {
  unauthorized: PropTypes.bool,
  onClose: PropTypes.func,
};
