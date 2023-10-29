"use client";
import { InputNumber } from "antd";
import React, { useState } from "react";

interface IProps {
    data: {
        label?: string;
        name: string;
        value: string;
        placeholder: string;
        prefix?: string;
        error?: string;
        onChange: (value: string | null, name: string) => void;
    };
    children?: React.ReactNode;
}

export default function CustomInputNumber({ data, children }: IProps) {
    const { label, name, value, onChange, placeholder, prefix, error } = data;

    const [changeType, setChangeInput] = useState<boolean>(false);

    const handleType = () => {
        const input = document.querySelector("#" + name) as HTMLInputElement;
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }

        setChangeInput(!changeType);
    };

    return (
        <div className={`content-input flex flex-col gap-2 w-full  mb-6`}>
            <label
                htmlFor={name}
                className="text-sm w-11/12 mx-auto relative block"
            >
                <span className="mb-2 inline-block">
                    {label}

                </span>
                <InputNumber
                    placeholder={placeholder}
                    prefix={prefix || ""}
                    style={{ width: "100%" }}
                    value={value}
                    onChange={(value: string | null) => onChange(value, name)}
                    id={name}
                />

            </label>
            <span className="text-xs text-alert-danger block w-11/12 mx-auto font-bold">
                {error}
            </span>
            {children}
        </div>
    );
}
