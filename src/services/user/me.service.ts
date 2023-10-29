import axios from "@/config/axios";

export const MeService = (route: string, token: string) => {
  return {
    call: axios.get(`${route}`),
  };
};
