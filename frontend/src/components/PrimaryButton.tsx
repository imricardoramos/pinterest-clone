import { MouseEventHandler, ReactNode } from "react";
import BaseButton from "./BaseButton";

type PrimaryButton = {
  className?: string;
  onClick?: MouseEventHandler;
  children: ReactNode;
};
export default function PrimaryButton({
  className,
  onClick,
  children,
}: PrimaryButton) {
  return (
    <BaseButton
      color="#E60023"
      textColor="#ffffff"
      className={`font-bold ${className}`}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}
