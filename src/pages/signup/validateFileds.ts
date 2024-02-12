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
            first_name: 'Este campo es obligatorio.',
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
            last_name: 'Este campo es obligatorio.',
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
            email: 'Este campo es obligatorio.',
        }));
        error = true;
    } else if (
        values.email.length > 0 &&
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
    ) {
        setErrors((prev) => ({
            ...prev,
            email: 'Correo electrónico inválido.',
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
            password: 'Este campo es obligatorio.',
        }));
        error = true;
    } else if (values.password.length > 0 && values.password.length < 7) {
        setErrors((prev) => ({
            ...prev,
            password: 'Debe tener al menos 8 caracteres.',
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
            repeat_password: 'Las contraseñas no coinciden.',
        }));
        error = true;
    }

    if (isFreelancer) {
        if (!values.phone_number.length) {
            setErrors((prev) => ({
                ...prev,
                phone_number: 'Este campo es obligatorio.',
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
