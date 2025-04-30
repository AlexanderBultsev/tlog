import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <footer className="shadow mt-auto py-3">
      <div className="container d-flex align-items-center justify-content-between">
        <p className="text-muted mb-0">
          © {new Date().getFullYear()} TLog. Все права защищены.
        </p>

        <div className="d-flex gap-3">
          <Link to="/about" className="text-muted text-decoration-none">
            О проекте
          </Link>
          <Link to="/privacy" className="text-muted text-decoration-none">
            Политика конфиденциальности
          </Link>
          <Link to="/contact" className="text-muted text-decoration-none">
            Контакты
          </Link>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
