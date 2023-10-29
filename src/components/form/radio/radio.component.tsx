import React from 'react';

interface IProps {
    data: {
        checked: boolean;
        label: string;
        name: string;
        id?: string;
    };
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

function Radio({ data, handleChange }: IProps) {
    return (
        <div className="content-check w-11/12 mx-auto flex items-center mb-2">
            <input
                type="radio"
                name={data.name}
                id={data.id}
                checked={data.checked}
                onChange={handleChange}
            />
            <label htmlFor={data.id} className="text-text-90 inline-block ml-2">
                {data.label}
            </label>
        </div>
    );
}

export default Radio;
