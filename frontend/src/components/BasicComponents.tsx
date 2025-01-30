import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

type InputProps = {
  type: HTMLInputTypeAttribute;
  value?: string | number;
  label: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
export function Input({
  type,
  value,
  label,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input
        className="outline-none border-2 border-gray-400 rounded-xl focus:border-blue-300 px-4 py-2 block"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
