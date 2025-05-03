import axios from "axios";

const api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true,
});

// api.interceptors.request.use((config) => {
//   const csrfToken = getCookie("csrftoken");

//   const csrfMethods = ["post", "put", "patch", "delete"];
//   if (csrfMethods.includes(config.method) && csrfToken) {
//     config.headers["X-CSRFToken"] = csrfToken;
//   }

//   return config;
// });

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
// }

export default api;