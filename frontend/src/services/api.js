import axios from "axios";

const API_AUTH = import.meta.env.VITE_AUTH_API;
const API_TASK = import.meta.env.VITE_TASK_API;

export const register = (data) =>
  axios.post(`${API_AUTH}/register`, data);

export const login = (data) =>
  axios.post(`${API_AUTH}/login`, data);

export const getTasks = () =>
  axios.get(API_TASK);

export const createTask = (data) =>
  axios.post(API_TASK, data);