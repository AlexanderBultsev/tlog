import axios from '../axios';

const getTravels = (params) => {
  return axios.get(`/api/travels/`, { params });
};

const getTravelById = (id) => {
  return axios.get(`/api/travels/${id}/`);
};

const createTravel = (data) => {
  return axios.post(`/api/travels/`, data);
};

const updateTravel = (id, data) => {
  return axios.patch(`/api/travels/${id}/`, data);
};

const removeTravel = (id) => {
  return axios.delete(`/api/travels/${id}/`);
};

const getTags = () => {
  return axios.get(`/api/tags/`);
}

const getTagById = (id) => {
  return axios.get(`/api/tags/${id}/`);
}

const createComment = (travelId, data) => {
  return axios.post(`/api/travels/${travelId}/comments/`, data);
}

const updateComment = (travelId, commentId, data) => {
  return axios.patch(`/api/travels/${travelId}/comments/${commentId}/`, data);
}

const removeComment = (travelId, commentId) => {
  return axios.delete(`/api/travels/${travelId}/comments/${commentId}/`);
}

const TravelService = {
  getTravels,
  getTravelById,
  createTravel,
  updateTravel,
  removeTravel,
  getTags,
  getTagById,
  createComment,
  updateComment,
  removeComment
}

export default TravelService