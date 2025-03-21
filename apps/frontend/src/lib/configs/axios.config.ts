import axios from "axios";

export const axiosPrivate = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api`,
  withCredentials: true,
});
