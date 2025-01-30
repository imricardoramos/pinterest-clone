import RoundedButton from "@/components/RoundedButton";
import { ReactNode } from "react";

type OverlayRoundedButtonProps = {
  className?: string;
  children: ReactNode;
};
export default function OverlayRoundedButton({
  className,
  children,
}: OverlayRoundedButtonProps) {
  return (
    <RoundedButton className={`bg-gray-100 opacity-75 ${className}`}>
      {children}
    </RoundedButton>
  );
}
