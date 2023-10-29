import { UserKey } from "@/storage/slice/user.slice";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const initializeAxios = () =>
  axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    // TODO: Comentamos cabecera Authorization debido a que no se utiliza ya esta cabecera y provoca fallo
    // ...(token &&
    //   getCookie(ECookies.TOKEN) && {
    //     headers: {
    //       Authorization: token || `Bearer ${getCookie(ECookies.TOKEN)}` || undefined,
    //     },
    //   }),
  });

const axiosInstance = initializeAxios();

axiosInstance.interceptors.request.use(
  (config) => {
    const userLocalStorage = localStorage.getItem(UserKey);

    const token = userLocalStorage ? JSON.parse(userLocalStorage).token : "";
    if (token?.length && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

export default axiosInstance;
