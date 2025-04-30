import axios from '../axios';

const register = (data) => {
  return axios.post("/api/users/", data);
};

const getMe = () => {
  return axios.get("/api/users/me/");
};

const getUserById = (id) => {
  return axios.get(`/api/users/${id}/`);
}

const UserService = {
  register,
  getMe,
  getUserById,
}

export default UserService