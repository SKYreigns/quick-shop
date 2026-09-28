import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-[#E5E2DA] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] ${
        hoverable
          ? "transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:border-[#D5D1C7]"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
