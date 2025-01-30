import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};
export default function Card({ children }: CardProps) {
  return (
    <div className="overflow-hidden shadow-lg rounded-3xl bg-white">
      {children}
    </div>
  );
}
