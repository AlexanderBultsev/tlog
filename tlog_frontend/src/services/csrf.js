import api from "../axios";

export const initCSRF = async () => {
  try {
    await api.get("/api/csrf/");
    console.log("CSRF token initialized.");
  } catch (error) {
    console.error("Failed to initialize CSRF token", error);
  }
};