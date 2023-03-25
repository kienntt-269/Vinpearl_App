import axios from "axios";
import queryString from "query-string";

const baseURL = "http://192.168.1.12:8080/api/v1/";

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: params => queryString.stringify({params})
});

axiosClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("tkn")}`
    }
  };
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
}, (err) => {
  throw err.response.data;
});

export default axiosClient;