// src/services/Api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Thay bằng URL backend .NET Core
});

export const login = (email, password, twoFA) =>
  api.post("/login", { email, password, twoFA });
export const register = (data) => api.post("/register", data);
export const getEvents = () => api.get("/events");
export const getEventById = (id) => api.get(`/events/${id}`);
export const getUserData = () => api.get("/users/me"); // Dành cho dashboard
export const sendContact = (data) => api.post("/contact", data);
export const forgotPassword = (email) =>
  api.post("/forgot-password", { email });

export default api;
