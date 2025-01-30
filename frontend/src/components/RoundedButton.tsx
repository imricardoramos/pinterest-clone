import { MouseEventHandler, ReactNode } from "react";

type RoundedButtonProps = {
  onClick?: MouseEventHandler;
  className?: string;
  children: ReactNode;
};
export default function RoundedButton({
  onClick,
  className,
  children,
}: RoundedButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded-full hover:bg-gray-200 ${className}`}
    >
      {children}
    </button>
  );
}
