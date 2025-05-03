import api from '../axios';

const register = (data) => {
  return api.post("/api/users/", data);
};

const getMe = () => {
  return api.get("/api/users/me/");
};

const getUserById = (id) => {
  return api.get(`/api/users/${id}/`);
}

const UserService = {
  register,
  getMe,
  getUserById,
}

export default UserService