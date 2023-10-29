import { AxiosCall, IError } from '@/interface/services';
import axios, { AxiosResponse } from 'axios';

export const fetchService = async <T>(axiosCall: AxiosCall<T>): Promise<{ result: T | null, error: IError | null }> => {

    try {
        const { data }: AxiosResponse = await axiosCall.call;
        return { result: data as T, error: null };
    } catch (err) {
        if (axios.isAxiosError(err)) {

            return { result: null, error: err?.response?.data as IError };
        }
    }

    return { result: null, error: null };
};


