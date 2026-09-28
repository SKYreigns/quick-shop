import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6B4F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]";

    const sizeStyles = {
      sm: "h-9 px-3 text-xs rounded-lg gap-1.5",
      md: "h-11 px-4 text-sm rounded-xl gap-2",
      lg: "h-13 px-6 text-base rounded-xl font-semibold gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-[#1F6B4F] text-white hover:bg-[#15513C] active:bg-[#104030] shadow-sm disabled:hover:bg-[#1F6B4F]",
      accent:
        "bg-[#F4B942] text-[#171717] hover:bg-[#E2A730] font-semibold shadow-sm disabled:hover:bg-[#F4B942]",
      outline:
        "border border-[#E5E2DA] bg-white text-[#171717] hover:bg-[#F8F7F3] hover:border-[#D5D1C7]",
      secondary: "bg-[#EBF4F0] text-[#1F6B4F] hover:bg-[#DDEEE6] font-medium",
      ghost: "text-[#171717] hover:bg-[#E5E2DA]/40",
      danger: "bg-[#C53D3D] text-white hover:bg-[#A93232] shadow-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
          fullWidth ? "w-full" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
