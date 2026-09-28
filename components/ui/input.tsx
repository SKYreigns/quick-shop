import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, helperText, id, ...props }, ref) => {
    const inputId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-[#171717] tracking-tight"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full h-11 px-3.5 text-sm rounded-xl bg-white border text-[#171717] placeholder:text-[#8E8B82] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1F6B4F] focus:border-transparent disabled:bg-[#F8F7F3] disabled:text-[#8E8B82] disabled:cursor-not-allowed ${
            error
              ? "border-[#C53D3D] focus:ring-[#C53D3D]"
              : "border-[#E5E2DA] hover:border-[#D5D1C7]"
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-[#C53D3D] font-medium mt-1">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-xs text-[#6B6B6B] mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
