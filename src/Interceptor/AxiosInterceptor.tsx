  import axios, { InternalAxiosRequestConfig } from "axios";
  // import { error } from "console";
  // import { config } from "process";
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
  });
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("token");  
      if (token ) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    }
  )
  export const setupResponseInterceptor = (navigate:any) => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          // localStorage.removeItem("token");
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }
  export default axiosInstance;
