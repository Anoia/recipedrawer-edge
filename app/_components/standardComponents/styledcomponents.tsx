import { InputProps, LabelProps, ButtonProps } from "react-html-props";

function StandardInput({ children, className, ...divProps }: InputProps) {
  return (
    <input
      // text-sm
      className={`bg-gray-50 border lg:border-teal-300 border-gray-300 text-gray-900 text-sm  focus:ring-teal-400 focus:ring-1 focus:border-slate-700 block w-full p-2 outline-none  ${className}`}
      {...divProps}
    >
      {children}
    </input>
  );
}

export function StandardInputLabel({
  children,
  className,
  ...labelProps
}: LabelProps) {
  return (
    <label
      className={`block mb-1 text-sm font-light text-gray-900 ${className}`}
      {...labelProps}
    >
      {children}
    </label>
  );
}

export function StandardButton({
  children,
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      className={`hover:bg-teal-800 focus:bg-teal-800 bg-teal-700 text-white py-3 px-12 ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default StandardInput;
