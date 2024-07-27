import { dispatchAddAlert } from "@/helpers/customevents";
import axios from "axios";
import { redirect } from "next/navigation";

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
    if (error.name === "CanceledError") {
      return error;
    }
    dispatchAddAlert({
      message: error.response?.data?.message ?? "something went wrong",
      severity: "error",
    });

    if (error.response && error.response.status === 401) {
      redirect("/login");
    }
    return error;
  }
);
