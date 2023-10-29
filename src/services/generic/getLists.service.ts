import axios from "@/config/axios";

export const  getListService = (route: string) => {
    return {
        call: axios.get(`${route}`),
    };
};
