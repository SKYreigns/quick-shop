import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent" | "success" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = "",
  variant = "secondary",
  ...props
}) => {
  const variantStyles = {
    primary: "bg-[#1F6B4F] text-white",
    secondary: "bg-[#EBF4F0] text-[#1F6B4F] font-semibold",
    accent:
      "bg-[#FEF8EC] text-[#9A6700] border border-[#F4B942]/30 font-semibold",
    success: "bg-[#E7F6EC] text-[#238B57] font-semibold",
    outline: "border border-[#E5E2DA] text-[#6B6B6B] bg-white",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-tight ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
