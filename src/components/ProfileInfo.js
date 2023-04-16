export default function ProfileInfo(user) {
  return (
    <div>
      {user.user && <p data-testid="profile">{user.user.username}</p>}
      {user.user && <p data-testid="profile">{user.user.firstName}</p>}
      {user.user && <p data-testid="profile">{user.user.lastName}</p>}
      {user.user && user.user.type === "student" && (
        <p data-testid="profile">{user.user.major}</p>
      )}
      {user.user && user.user.type === "student" && (
        <p data-testid="profile">{user.user.classYear}</p>
      )}
      {user.user && user.user.type === "faculty" && (
        <p data-testid="profile">{user.user.department}</p>
      )}
      {user.user &&
        (user.user.type === "faculty" ||
          user.user.type === "administration") && (
          <p data-testid="profile">{user.user.title}</p>
        )}
      {user.user && <p data-testid="profile">{user.user.type}</p>}
    </div>
  );
}
