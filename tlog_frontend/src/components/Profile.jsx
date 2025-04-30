import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="d-flex flex-column gap-3 align-items-center">
        <h1 className="text-dark mb-4">Вы не авторизованы</h1>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <h1 className="text-dark mb-4">Профиль</h1>
      <div className="card shadow-sm w-100" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h5 className="card-title">@{user.username}</h5>
          <p className="card-text">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
