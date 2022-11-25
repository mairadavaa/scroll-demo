import axios from "axios";

const API = axios.create({
  baseURL: "https://mepo-af-project-production.up.railway.app/api",
  withCredentials: true,
});
export const authAPI = async (url, data) => {
  return await API.post(url, data);
};
export const patchAPI = async (url, data) => {
  return await API.patch(url, data);
};
export const getAPI = async (url) => {
  return await API.get(url);
};
