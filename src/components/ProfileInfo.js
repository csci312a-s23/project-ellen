export default function ProfileInfo(user) {
  return (
    <div>
      {user.user && <p>{user.user.firstName}</p>}
      {user.user && <p>{user.user.lastName}</p>}
      {user.user && <p>{user.user.major}</p>}
      {user.user && <p>{user.user.classYear}</p>}
      {user.user && <p>{user.user.type}</p>}
    </div>
  );
}
