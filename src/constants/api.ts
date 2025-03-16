import axios, { AxiosInstance } from "axios";
import config from "./config.json";

export const apiInstance = (prefix = ""): AxiosInstance => {
  return axios.create({
    baseURL: `${config.baseUrl}${prefix}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};
