import PropTypes from "prop-types";
import styles from "./profile.module.css";
export default function ProfileInfo(user) {
  const currentUser = user.user;

  return (
    <div className={styles.profile}>
      <h1>About me </h1>

      <ul className={styles.infolist}>
        <li>
          <p data-testid="profile">
            <span>&#128205;</span> Username: {currentUser.username}
          </p>
        </li>
        <li>
          <p data-testid="profile">
            <span>&#x1F3F7;</span> First Name: {currentUser.firstName}
          </p>
        </li>
        <li>
          <p data-testid="profile">
            <span>&#x1F46A;</span> Last Name: {currentUser.lastName}
          </p>
        </li>
        <li>
          <p data-testid="profile">
            <span>&#x1F4CC;</span> Type: {currentUser.type}
          </p>
        </li>
        <li>
          {currentUser.type === "student" && (
            <p data-testid="profile">
              <span>&#x1F4DA;&#xFE0F;</span> Major: {currentUser.major}
            </p>
          )}
        </li>

        <li>
          {currentUser.type === "student" && (
            <p data-testid="profile">
              <span>&#127891;</span> Class Year: {currentUser.classYear}
            </p>
          )}
        </li>

        <li>
          {currentUser.type === "faculty" && (
            <p data-testid="profile">Department: {currentUser.department}</p>
          )}
        </li>

        <li>
          {(currentUser.type === "faculty" ||
            currentUser.type === "administration") && (
            <p data-testid="profile">Title: {currentUser.title}</p>
          )}
        </li>
      </ul>
    </div>
  );
}

ProfileInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    classYear: PropTypes.number,
    type: PropTypes.string.isRequired,
    createdAt: PropTypes.number,
    major: PropTypes.string,
    department: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
