import { MouseEventHandler, ReactNode } from "react";
import BaseButton from "./BaseButton";

type PrimaryButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: MouseEventHandler;
  children: ReactNode;
};
export default function PrimaryButton({
  type,
  className,
  onClick,
  children,
}: PrimaryButtonProps) {
  return (
    <BaseButton
      type={type}
      color="#EFEFEF"
      textColor="#000000"
      className={`font-bold ${className}`}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}
