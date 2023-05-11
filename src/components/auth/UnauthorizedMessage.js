import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import LoginButton from "../LoginButton";

export default function UnauthorizedPopup({ unauthrozied, onClose }) {
  return (
    <Popup open={unauthrozied} modal onClose={onClose}>
      <div>
        <h1>
          {
            "You are not authorized to use this resource. Please sign in to your account"
          }
        </h1>
        <LoginButton />
      </div>
    </Popup>
  );
}

UnauthorizedPopup.propTypes = {
  unauthrozied: PropTypes.bool,
  onClose: PropTypes.func,
};
