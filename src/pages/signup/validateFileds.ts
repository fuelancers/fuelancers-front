/* eslint-disable @typescript-eslint/no-unsafe-return */
import { DataSignUp } from '@/interface/services/auth/';
export const validateFields = <T>(
    values: DataSignUp,
    setErrors: React.Dispatch<React.SetStateAction<T>>,
    isFreelancer: boolean
) => {
    let error = false;

    if (!values.first_name.length) {
        setErrors((prev) => ({
            ...prev,
            first_name: 'This field is required.',
        }));
        error = true;
    } else {
        setErrors((prev) => ({
            ...prev,
            first_name: '',
        }));
    }

    if (!values.last_name.length) {
        setErrors((prev) => ({
            ...prev,
            last_name: 'This field is required.',
        }));
        error = true;
    } else {
        setErrors((prev) => ({
            ...prev,
            last_name: '',
        }));
    }

    if (!values.email.length) {
        setErrors((prev) => ({
            ...prev,
            email: 'This field is required.',
        }));
        error = true;
    } else if (
        values.email.length > 0 &&
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
    ) {
        setErrors((prev) => ({
            ...prev,
            email: 'Invalid email.',
        }));
        error = true;
    } else {
        setErrors((prev) => ({
            ...prev,
            email: '',
        }));
    }

    if (!values.password.length) {
        setErrors((prev) => ({
            ...prev,
            password: 'This field is required.',
        }));
        error = true;
    } else if (values.password.length > 0 && values.password.length < 7) {
        setErrors((prev) => ({
            ...prev,
            password: 'Gotta be at least 8 characters',
        }));
        error = true;
    } else {
        setErrors((prev) => ({
            ...prev,
            password: '',
        }));
    }

    if (values.repeat_password !== values.password) {
        setErrors((prev) => ({
            ...prev,
            repeat_password: 'Passwords do not match',
        }));
        error = true;
    }

    if (isFreelancer) {
        if (!values.phone_number.length) {
            setErrors((prev) => ({
                ...prev,
                phone_number: 'This field is required.',
            }));
            error = true;
        } else {
            setErrors((prev) => ({
                ...prev,
                phone_number: '',
            }));
        }
    }

    return error;
};
