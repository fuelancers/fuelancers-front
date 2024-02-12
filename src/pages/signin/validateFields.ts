import { DataSignIn } from '@/interface/services/auth/';

export const validateFields = <T>(
    values: DataSignIn,
    setErrors: React.Dispatch<React.SetStateAction<T>>
) => {
    let error = false;

    if (!values.email.length) {
        setErrors((prev) => ({
            ...prev,
            email: 'Este campo es obligatorio',
        }));
        error = true;
    } else if (
        values.email.length > 0 &&
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
    ) {
        setErrors((prev) => ({
            ...prev,
            email: 'Ingresa un correo electrónico válido',
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
            password: 'Este campo es obligatorio',
        }));
        error = true;
    } else if (values.password.length > 0 && values.password.length < 5) {
        setErrors((prev) => ({
            ...prev,
            password: 'Debe tener al menos 8 caracteres',
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
