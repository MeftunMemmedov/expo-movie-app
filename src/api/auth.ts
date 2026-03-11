import axios from "axios";

export const baseURL = `${process.env.EXPO_PUBLIC_API_URL}/auth/v1/`;
export const apikey = process.env.EXPO_PUBLIC_API_KEY;

const axiosAuthInstance = axios.create({
  baseURL,
  headers: {
    apikey,
    Authorization: `Bearer ${apikey}`,
  },
});

export default axiosAuthInstance;
