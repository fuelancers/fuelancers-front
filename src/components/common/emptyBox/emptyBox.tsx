import React from "react";
import Button from "../buttons/button/button.component";

type IProps = {
  labelButton: string;
  onClick: () => void;
};

export default function EmptyBox({ labelButton, onClick }: IProps) {
  return (
    <div className="empty-box">
      <Button
        data={{
          label: labelButton,
          customStyles: "text-primary",
          onClick: onClick,
        }}
      />
      <span className="text-xs text-text-70 text-center block">
        Este campo se ocultará si está vacío
      </span>
    </div>
  );
}
