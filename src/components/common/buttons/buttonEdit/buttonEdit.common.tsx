import React from "react";

interface IProps {
  showText?: boolean;
  inline?: boolean;
  onClick: () => void;
  customStyle?: string;
  textStyle?: string;
  label?: string;
  icon?: string;
}

export default function ButtonEdit({
  showText = true,
  onClick,
  inline = false,
  customStyle,
  label = "Edit",
  icon,
  textStyle,
}: IProps) {
  return (
    <button
      className={`block cursor-default w-fit rounded ${inline ? "absolute top-0 right-0  " : "relative"
        } ${customStyle ? customStyle : ""} lg:cursor-pointer`}
      onClick={onClick}
    >
      <img
        src={`/assets/icons/${icon ? icon : "edit"}-icon.svg`}
        width={15}
        height={15}
        alt="Edit icon"
        className="inline-block"
      />
      {showText ? (
        <span className={`text-text-90 inline-block ml-2 ${textStyle || 'text-sm'}`}>{label}</span>
      ) : null}
    </button>
  );
}
