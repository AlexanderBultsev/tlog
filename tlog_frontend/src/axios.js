import axios from "axios"

const api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

export default api;