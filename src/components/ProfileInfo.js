import PropTypes from "prop-types";

export default function ProfileInfo(user) {
  const currentUser = user.user;

  return (
    <div>
      {currentUser && <p data-testid="profile">{currentUser.username}</p>}
      {currentUser && <p data-testid="profile">{currentUser.firstName}</p>}
      {currentUser && <p data-testid="profile">{currentUser.lastName}</p>}
      {currentUser && currentUser.type === "student" && (
        <p data-testid="profile">{currentUser.major}</p>
      )}
      {currentUser && currentUser.type === "student" && (
        <p data-testid="profile">{currentUser.classYear}</p>
      )}
      {currentUser && currentUser.type === "faculty" && (
        <p data-testid="profile">{currentUser.department}</p>
      )}
      {currentUser &&
        (currentUser.type === "faculty" ||
          currentUser.type === "administration") && (
          <p data-testid="profile">{currentUser.title}</p>
        )}
      {currentUser && <p data-testid="profile">{currentUser.type}</p>}
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
  }),
};
