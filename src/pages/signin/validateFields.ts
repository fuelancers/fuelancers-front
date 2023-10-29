import { DataSignIn } from '@/interface/services/auth/';

export const validateFields = <T>(
    values: DataSignIn,
    setErrors: React.Dispatch<React.SetStateAction<T>>
) => {
    let error = false;

    if (!values.email.length) {
        setErrors((prev) => ({
            ...prev,
            email: 'This field is required',
        }));
        error = true;
    } else if (
        values.email.length > 0 &&
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
    ) {
        setErrors((prev) => ({
            ...prev,
            email: 'Enter a valid email',
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
    } else if (values.password.length > 0 && values.password.length < 5) {
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

    return error;
};
