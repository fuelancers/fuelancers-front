import { TypeListsSelect } from '@/interface/generics/ILists.interface';
import { useState } from 'react';
import Select, { components, PlaceholderProps, SingleValue } from 'react-select';
import './select.style.scss';

interface IProps {
    data: {
        label?: string;
        name: string;
        placeholder?: string;
        options: readonly TypeListsSelect[];
        defaultValue?: TypeListsSelect;
        customStyles?: string;
        fullWidth?: boolean;
        styleInput?: string;
        value: TypeListsSelect | null;
        onSelect: (option: SingleValue<TypeListsSelect>) => void;
    };
    children?: React.ReactNode;
}

const Placeholder = (props: PlaceholderProps<TypeListsSelect>) => {
    return <components.Placeholder {...props} />;
};

export default function CustomSelect({ data, children }: IProps) {
    const {
        label,
        name,
        options,
        placeholder,
        onSelect,
        defaultValue,
        customStyles,
        fullWidth,
        value,
        styleInput,
    } = data;

    return (
        <div
            className={`content-input flex flex-col gap-2 w-full mb-6 ${customStyles ? customStyles : ''
                }`}
        >
            <label
                htmlFor={name}
                className={`text-sm mx-auto block ${fullWidth ? 'w-full' : 'w-11/12'}`}
            >
                {label ? label : ''}
                <Select
                    defaultValue={defaultValue}
                    onChange={(newValue) => {
                        onSelect(newValue);
                    }}
                    components={{ Placeholder }}
                    placeholder={placeholder || 'Select'}
                    options={options}
                    name={name}
                    value={value}
                    isMulti={false}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? '#009EFF' : '#C1C1C1',
                            borderWidth: '1px',
                            boxShadow: state.isFocused ? '0px 0px 4px 2px #009EFF33' : 'none',
                            marginTop: label ? '0.5rem' : '0px',
                            transition: 'all .3s linear',
                            borderRadius: fullWidth ? '30px' : '5px',
                            padding: '0px 8px',
                        }),
                    }}
                />
            </label>
            {children}
        </div>
    );
}
