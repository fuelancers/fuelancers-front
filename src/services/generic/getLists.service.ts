import axios from "@/config/axios";

export const  getListService = (route: string, query?: string) => {
    return {
        call: axios.get(`${route}${query || ""}`),
    };
};
