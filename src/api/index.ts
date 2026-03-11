import axios from "axios";

export const baseURL = `${process.env.EXPO_PUBLIC_API_URL}/rest/v1/`;
export const apikey = process.env.EXPO_PUBLIC_API_KEY;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    apikey,
    Authorization: `Bearer ${apikey}`,
  },
});

export default axiosInstance;
