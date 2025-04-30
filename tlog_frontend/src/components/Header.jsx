import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="shadow py-3">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="text-dark h3 mb-0 text-decoration-none">
          TLog
        </Link>

        <nav className="d-flex gap-3">
          <Link to="/travels" className="text-dark text-decoration-none">
            Главная
          </Link>
          {user && (
            <>
              <Link to={"/travels/create"} className="text-dark text-decoration-none">
                Создать путешествие
              </Link>
              <Link to={`/travels/?user_id=${user.id}`} className="text-dark text-decoration-none">
                Мои путешествия
              </Link>
            </>
          )}
        </nav>

        <div className="d-flex align-items-center gap-3">
          {user ? (
            <>
              <Link to={"/profile"} className="text-muted text-decoration-none">
                @{user.username}
              </Link>
              <button onClick={handleLogout} className="btn btn-outline-dark btn-sm" >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-dark btn-sm">
                Вход
              </Link>
              <Link to="/register" className="btn btn-dark btn-sm">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </header>

  );
};

export default Header;
