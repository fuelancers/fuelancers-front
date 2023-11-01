import axios from "@/config/axios";

export const AuthService = <T>(data: T, route: string) => {
    return {
        call: axios.post(`${route}`, data)
    };
};

export const UserMeService = (route: string, token: string) => {
    return {
      call: axios.get(route, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
    };
};
