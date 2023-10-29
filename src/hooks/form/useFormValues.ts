import { Dispatch, SetStateAction, useState } from 'react';
import { ValidationForm } from '@/interface/enums';
import { TypeListsSelect } from '@/interface/generics';
import { SingleValue } from 'react-select';
import { Dayjs } from 'dayjs';


type ReturnHook<T> = {
    values: T;
    setValues: Dispatch<SetStateAction<T>>;
    errors: T;
    handleChangeInput: (e: React.FormEvent<HTMLInputElement>, validate?: ValidationForm) => void;
    handleChangeCheckbox: (name: string, id: string) => void;
    handleChangeSingleCheckbox: (e: React.FormEvent<HTMLInputElement>) => void;
    handleChangeRadio: (name: string, id: string) => void;
    handleChangeTextArea: (e: React.FormEvent<HTMLTextAreaElement>) => void;
    handleChangeSelect: (option: SingleValue<TypeListsSelect>, key: string) => void;
    handleChangeDate: (date: Dayjs | null, dateString: string, name: string) => void;
    handleChangeInputNumber: (value: string | null, name: string) => void;
    setErrors: React.Dispatch<React.SetStateAction<T>>;
};

type TypeCloneValues = {
    [key: string]: boolean | number | string | number[] | string[];
};

export function useFormValues<T>(customValues: T): ReturnHook<T> {
    const [values, setValues] = useState<T>(customValues);
    const [errors, setErrors] = useState<T>(customValues);

    const handleChangeInput = (
        e: React.FormEvent<HTMLInputElement>,
        validate?: ValidationForm
    ): void => {
        const { value, name } = e.target as HTMLInputElement;
        if (validate === ValidationForm.number) {
            console.log(isNaN(parseInt(value)));
            if (isNaN(parseInt(value)) && !!value.length) return;
        }

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangeCheckbox = (name: string, id: string): void => {
        const cloneValues = values as TypeCloneValues;
        const listCheckbox = cloneValues[name] as string[];

        if (listCheckbox.includes(id)) {
            const newValues = listCheckbox.filter((item) => item !== id);
            setValues((prev) => ({
                ...prev,
                [name]: newValues,
            }));
        } else {
            setValues((prev) => ({
                ...prev,
                [name]: listCheckbox.concat([id]),
            }));
        }
    };
    const handleChangeSingleCheckbox = (e: React.FormEvent<HTMLInputElement>): void => {
        const { name, checked } = e.target as HTMLInputElement;
        setValues((prev) => ({
            ...prev,
            [name]: checked,
        }));

    };

    const handleChangeRadio = (name: string, id: string): void => {
        setValues((prev) => ({
            ...prev,
            [name]: id,
        }));
    };

    const handleChangeTextArea = (e: React.FormEvent<HTMLTextAreaElement>): void => {
        const { value, name } = e.target as HTMLTextAreaElement;

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangeSelect = (option: SingleValue<TypeListsSelect>, key: string): void => {
        setValues((prev) => ({
            ...prev,
            [key]: option,
        }));
    };

    const handleChangeDate = (date: Dayjs | null, dateString: string, name: string) => {
        setValues((prev) => ({
            ...prev,
            [name]: dateString
        }))
    }

    const handleChangeInputNumber = (value: string | null, name: string) => {
        setValues((prev) => ({
            ...prev,
            [name]: value || ""
        }))
    }

    return {
        values,
        setValues,
        errors,
        handleChangeInput,
        handleChangeCheckbox,
        handleChangeSingleCheckbox,
        handleChangeTextArea,
        handleChangeRadio,
        handleChangeSelect,
        handleChangeDate,
        handleChangeInputNumber,
        setErrors,
    };
}
