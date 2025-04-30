import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(data);
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <h1 className="text-dark">Регистрация</h1>
      <div className="card shadow-sm w-100" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit} className="card-body d-flex flex-column">

          <label htmlFor="username" className="form-label">Имя пользователя</label>
          <div className="input-group mb-3">
            <span className="input-group-text" id="user-tag">@</span>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange}
              className="form-control"
              required
              aria-describedby="user-tag"
            />
          </div>

          <label htmlFor="email" className="form-label">Электронная почта</label>
          <div className="input-group mb-3">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email@example.com"
              value={data.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <label htmlFor="password" className="form-label">Пароль</label>
          <div className="input-group mb-3">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="privacy"
              id="privacy"
              className="form-check-input"
              required
            />
            <label className="form-check-label" htmlFor="privacy">Согласен с политикой конфиденциальности</label>
          </div>

          <button type="submit" className="btn btn-success">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
