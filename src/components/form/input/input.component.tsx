"use client";
import React, { useState } from "react";

interface IProps {
  data: {
    label?: string;
    name: string;
    value: string;
    placeholder: string;
    error?: string;
    type?: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    inline?: boolean;
    icon?: string;
  };
  children?: React.ReactNode;
}

export default function Input({ data, children }: IProps) {
  const {
    label,
    name,
    value,
    onChange,
    placeholder,
    type,
    inline,
    icon,
    error,
  } = data;

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
    <div
      className={`content-input flex flex-col gap-2 w-full  ${
        inline ? "mb-4" : "mb-6"
      }`}
    >
      <label
        htmlFor={name}
        className={`text-sm w-11/12 mx-auto relative ${
          inline ? "flex gap-3 items-center" : "block"
        }`}
      >
        {label}
        {icon ? (
          <img
            src={`/assets/icons/${icon}-icon.svg`}
            width={24}
            height={24}
            alt="Icon input"
          />
        ) : null}
        <input
          type={!!type ? type : "text"}
          value={value}
          placeholder={placeholder}
          name={name}
          id={name}
          onChange={onChange}
          className={`py-2 px-4 border-[1px] text-sm rounded-md border-text-50 block w-full outline-none focus:border-primary focus:shadow-input transition-all ease-linear duration-300 ${
            inline ? "mt-0" : "mt-2"
          }`}
        />
        {type === "password" ? (
          <button
            className="absolute right-4 top-9 cursor-default"
            onClick={handleType}
            type="button"
          >
            <img
              src={`/assets/icons/${
                !changeType ? "eye" : "close-eye"
              }-icon.svg`}
              width={22}
              height={22}
              alt="Icon input"
            />
          </button>
        ) : null}
      </label>
      <span className="text-xs text-alert-danger block w-11/12 mx-auto font-bold">
        {error}
      </span>
      {children}
    </div>
  );
}
