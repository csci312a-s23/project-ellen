import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import LoginButton from "../LoginButton";
import styles from "./UnauthorizedMessage.module.css";

export default function UnauthorizedPopup({ unauthrozied, onClose, message }) {
  return (
    <Popup open={unauthrozied} modal onClose={onClose}>
      <div className={styles.modal}>
        <a className={styles.close} onClick={onClose}>
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
  unauthrozied: PropTypes.bool,
  onClose: PropTypes.func,
};
