import api from '../axios';

const getTravels = (params) => {
  return api.get(`/api/travels/`, { params });
};

const getTravelById = (id) => {
  return api.get(`/api/travels/${id}/`);
};

const createTravel = (data) => {
  return api.post(`/api/travels/`, data);
};

const updateTravel = (id, data) => {
  return api.patch(`/api/travels/${id}/`, data);
};

const removeTravel = (id) => {
  return api.delete(`/api/travels/${id}/`);
};

const getTags = () => {
  return api.get(`/api/tags/`);
}

const getTagById = (id) => {
  return api.get(`/api/tags/${id}/`);
}

const createComment = (travelId, data) => {
  return api.post(`/api/travels/${travelId}/comments/`, data);
}

const updateComment = (travelId, commentId, data) => {
  return api.patch(`/api/travels/${travelId}/comments/${commentId}/`, data);
}

const removeComment = (travelId, commentId) => {
  return api.delete(`/api/travels/${travelId}/comments/${commentId}/`);
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