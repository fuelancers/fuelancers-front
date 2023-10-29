import React from 'react';

interface IProps {
    data: {
        label: string;
        name: string;
        value: string;
        placeholder: string;
        onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
    };
    children?: React.ReactNode;
}

export default function TextArea({ data }: IProps) {
    const { label, name, value, onChange, placeholder } = data;
    return (
        <div className="content-input flex flex-col gap-2 w-full mb-6">
            <label htmlFor={name} className="text-sm w-11/12 mx-auto block">
                {label}
                <textarea
                    value={value}
                    placeholder={placeholder}
                    name={name}
                    id={name}
                    onChange={onChange}
                    rows={5}
                    className="py-2 px-4 border-[1px] text-sm rounded-md border-text-50 block mt-2 w-full outline-none focus:border-primary focus:shadow-input transition-all ease-linear duration-300"
                />
            </label>
        </div>
    );
}
