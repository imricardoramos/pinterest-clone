import { MouseEventHandler, ReactNode } from "react";

type BaseButtonProps = {
  type?: "button" | "submit" | "reset";
  className: string;
  color: string;
  textColor: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};
export default function BaseButton({
  type,
  className,
  color,
  textColor,
  onClick,
  children,
}: BaseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-3xl ${className}`}
      style={{ backgroundColor: color, color: textColor }}
      type={type}
    >
      {children}
    </button>
  );
}
