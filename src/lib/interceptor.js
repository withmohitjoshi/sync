import axios from "axios";
import "../helpers/toaster";
import { Toaster } from "../helpers/toaster";

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SITE_BASEURL}/api/`,
});

apiClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    Toaster.error(error.response?.data?.message ?? "something went wrong");

    if (error.response && error.response.status === 401) {
      if (window !== undefined || window !== "undefined") {
        window.location.href = "/login";
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);
