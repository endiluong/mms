import axios from "axios";
import { getAccessToken } from "./auth";

// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },

  validateStatus: (status) => {
    return status >= 200 && status < 2000;
  },
  // credentials: 'include'
});

const requestHandler = (request) => {
  const token = getAccessToken();
  request.headers["x-access-token"] = token;
  return request;
};

const responseHandler = (response) => {
  // TODO: Handle Response indeed
  return response;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

axiosClient.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axiosClient.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default axiosClient;
