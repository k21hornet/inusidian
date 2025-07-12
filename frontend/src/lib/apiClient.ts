import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const request = async (url: string, method: string, data?: any) => {
  const response = await apiClient.request({
    url,
    method,
    data,
  });
  return response.data;
};

export const getApi = (url: string) => request(url, "GET");
export const postApi = (url: string, data?: any) => request(url, "POST", data);
export const putApi = (url: string, data?: any) => request(url, "PUT", data);
export const deleteApi = (url: string) => request(url, "DELETE");
