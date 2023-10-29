import axios from "@/config/axios";

export const ExpertsServiceUpdate = <T>(data: T, route: string, token?: string | null) => {
    return {
        call: axios.patch(`${route}`, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }), 
    };
};

export const GetExpertService = (route: string, token: string) => {
    return {
        call: axios.get(`${route}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }),
    };
};

export const ExpertsServiceCreate = (data: any, route: string) => {
    return {
        call: axios.post(`${route}`, data),
    };
};

export const CreateExpertService = (data: any, route: string) => {
    return {
        call: axios.post(`${route}`, data),
    };
};

export const DeleteExpertService = (route: string) => {
    return {
        call: axios.delete(`${route}`),
    };
};