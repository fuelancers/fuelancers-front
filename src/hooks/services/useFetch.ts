import { AxiosCall } from '@/interface/services/';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { handleLoadingPage } from '@/storage/slice/general.slice';

interface Error {
    success: boolean;
    error: any;
    code: number;
}

interface IResult<T> {
    response: T | null;
}

export const useFetch = () => {
    const dispatch = useDispatch();

    const [error, setError] = useState<Error | null>(null);

    const callEndpoint = async <T>(axiosCall: AxiosCall<T>): Promise<IResult<T>> => {

        dispatch(handleLoadingPage({ loading_page: true }))
        if (error !== null) setError(null);

        const result: IResult<T> = {
            response: null,
        };
        try {
            const { data }: AxiosResponse = await axiosCall.call;
            result.response = data as T;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err?.response?.data as Error);
            }
        } finally {
            dispatch(handleLoadingPage({ loading_page: false }))
        }
        return result;
    };

    return { callEndpoint, error };
};
