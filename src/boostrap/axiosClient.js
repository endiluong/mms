import axios from "axios";

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

export default axiosClient;
