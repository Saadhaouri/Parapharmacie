// src/services/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:88/", // Replace with your backend API base URL
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent (e.g., add headers)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with the response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
