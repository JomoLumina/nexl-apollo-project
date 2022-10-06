import axios from 'axios';

const apiUrl : string | undefined  = process.env.APOLLO_API_URL;

if (!apiUrl) throw new Error('API Url for Space X Apollo API was not found');

const secure = process.env.NODE_ENV === "production";
const protocol = secure ? "https://" : "http://";

const axiosInstance = axios.create({
  baseURL: `${protocol}${apiUrl}`,
});

axiosInstance.interceptors.response.use(
  (response:any) => response,
  (error:any) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
